import { Button } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router';
import { useAddCartMutation } from '@src/redux/endPoint/card';
import { loginSuccess, setUserDetails } from '@src/redux/slices/loginSlice';
import { AppDispatch, RootState } from '@src/redux/store';
import { useDispatch, useSelector } from 'react-redux'

type Props = {
    className?: string
    data: any
}
const Product = ({ className, data }: Props) => {
    const router = useRouter();
    const user: any = useSelector((state: RootState) => state.auth.data)
    const [addToCart] = useAddCartMutation()
    const dispatch = useDispatch<AppDispatch>();


    const handleAddToCard = async (id: string) => {
        if (!user) {
            router.push("/login")
            return;
        }
        try {
            const cartId = user?.data?.cartId;
            const body = {
                bookId: id,
                quantity: 1,
                customerId: user?.data?.customerId,
            }
            const res: any = await addToCart({ body, id: cartId });
            if (res) {

                dispatch(loginSuccess({ ...user, data: { ...user.data, cartId: res.data.data._id } }));

                router.push('/cart')
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={className}>
            <div className="relative w-full">
                <Image alt='anh book' width={320} height={600} src='https://marketplace.canva.com/EAD5DANBwv4/1/0/1003w/canva-xanh-l%C3%A1-l%C3%A1-c%C3%A2y-c%E1%BA%A7u-nguy%E1%BB%87n-nh%E1%BA%ADt-k%C3%BD-s%C3%A1ch-b%C3%ACa-lH-O_A1xreI.jpg' />
                <div className="absolute z-10 bottom-0 w-full bg-[#FFFFFF]/80">
                    <div className="px-[10px] py-[10px]">
                        <div>
                            Tên Sách: {data?.name}
                        </div>
                        <div>
                            Tác giả: {data?.author}
                        </div>
                        <div>
                            Giá bán: {data?.price} đồng
                        </div>
                        <Button
                            onClick={() => handleAddToCard(data?._id)}
                            className="w-full h-[42px] max-h-full rounded-md bg-[#d7348b] px-[10px] text-[#ffffff] hover:bg-[#f83da0]"
                        >Thêm Giỏ Hàng</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product