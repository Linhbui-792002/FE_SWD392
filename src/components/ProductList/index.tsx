import React, { useState, useEffect } from 'react'
import Product from './components/product'
import { TextInput } from '@mantine/core'
import useDebounce from '@src/lib/hooks/useDebounce';
import { useGetListBookMutation } from '@src/redux/endPoint/books';

const ListProduct = () => {
    const [getAllBook] = useGetListBookMutation();
    const [searchName, setSearchName] = useState<string>('');
    const [listBook, setListBook] = useState<any>([]);

    const handleSetTextName = (value: string) => {
        setSearchName(value)
    }
    const debounced = useDebounce(searchName, 500);
    useEffect(() => {
        getListBook(searchName)
    }, [getAllBook, debounced])

    const getListBook = async (name: string) => {
        try {
            const res: any = await getAllBook({ name });
            if (res) {
                // setListBook("hello")
                const data = res?.data
                setListBook(data)
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }



    return (
        <div className="w-full pb-[60px] min-h-[80vh]">
            <div className="w-[80%] mx-[auto] grid grid-cols-12 gap-4 justify-center">
                <div className="flex justify-between col-span-12 mt-[20px] text-3xl">
                    Sách bán chạy
                    <TextInput
                        placeholder="Nhập tên sách cần tìm"
                        className="w-[60%]"
                        onChange={(e) => handleSetTextName(e.target.value)}
                    />
                </div>

                {listBook &&

                    listBook.map((item: any, index: number) => (
                        <Product
                            key={index}
                            className="col-span-3"
                            data={item}
                        />
                    ))
                }
                {listBook.length == 0 &&
                    <div className="w-full col-span-12 text-2xl">
                        Không Tìm Thấy Sách
                    </div>}
            </div>
        </div>
    )
}

export default ListProduct