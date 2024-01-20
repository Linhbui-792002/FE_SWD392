import React from 'react'
import Product from './components/product'
import { TextInput } from '@mantine/core'

const ListProduct = () => {
    return (
        <div className="w-full pb-[60px]">
            <div className="w-[80%] mx-[auto] grid grid-cols-12 gap-4 justify-center">
                <div className="flex justify-between col-span-12 mt-[20px] text-3xl">
                    Sách bán chạy
                    <TextInput
                        placeholder="Nhập tên sách cần tìm"
                        className="w-[60%]"
                    />
                </div>

                {Array.from(new Array(20)).map((_, index) => (
                    <Product
                        key={index}
                        className="col-span-3"
                    />
                ))}
            </div>
        </div>
    )
}

export default ListProduct