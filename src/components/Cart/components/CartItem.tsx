import { Button, TextInput } from '@mantine/core'
import { useDeleteCartItemMutation } from '@src/redux/endPoint/card'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    data: any,
    cartId: any
}

const CartItem = ({ data, cartId }: Props) => {
    const router = useRouter()
    const [deleteCartItem] = useDeleteCartItemMutation()

    const handleDeleteCartItem = async (id: any) => {
        try {
            const body = {
                cartId: cartId,
                bookItemId: id
            }
            const res = await deleteCartItem(body)
            if (res) {
                router.push('/cart')
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="w-full flex flex-row grid grid-cols-12 items-center py-[20px] mb-[20px] border-b-2">
            <div className="col-span-6 h-[60px] flex items-center justify-start gap-5">
                <Image
                    alt="anh book"
                    width={50}
                    height={50}
                    layout="fixed"
                    objectFit="cover"
                    className="rounded-md"
                    src="https://marketplace.canva.com/EAD5DANBwv4/1/0/1003w/canva-xanh-l%C3%A1-l%C3%A1-c%C3%A2y-c%E1%BA%A7u-nguy%E1%BB%87n-nh%E1%BA%ADt-k%C3%BD-s%C3%A1ch-b%C3%ACa-lH-O_A1xreI.jpg"
                />
                <div className="flex items-center justify-center">
                    {data?.book?.name}
                </div>
            </div>

            <div className="col-span-2">{data?.book?.price}</div>
            <div className="col-span-2 mb-0">
                <TextInput className="w-[100px]" defaultValue={data?.quantity} />
            </div>
            <div className="col-span-2 flex items-center justify-center">
                <Button
                    onClick={() => handleDeleteCartItem(data?._id)}
                    className="w-[60px] py-[10px] !bg-[#e10908] text-[#ffffff]">Xóa</Button>
            </div>
        </div>
    )
}

export default CartItem