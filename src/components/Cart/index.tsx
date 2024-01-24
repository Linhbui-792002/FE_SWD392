import React, { useEffect, useState } from 'react'
import CartItem from './components/CartItem'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { AppDispatch, RootState } from '@src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useGetListCartMutation } from '@src/redux/endPoint/card';

const Cart = () => {
    const user: any = useSelector((state: RootState) => state.auth.data)
    const [getListCart] = useGetListCartMutation();
    const [cartItem, setCartItem] = useState<any>()
    const [total, setTotal] = useState<any>(0)

    const router = useRouter()
    useEffect(() => {
        if (user) {
            getCartByCusID(user?.data?.customerId)
        }

    }, [user, getListCart, router])

    useEffect(() => {
        let totalPrice = 0
        if (cartItem) {
            cartItem.map((item: any) => {
                totalPrice += Number(item?.book?.price) * Number(item?.quantity)
            })
            setTotal(totalPrice)
        }

    }, [cartItem, user, getListCart, router])

    const getCartByCusID = async (id: any) => {
        try {
            const res: any = await getListCart(id);
            if (res) {
                setCartItem(res.data.items)
            }
        } catch (error) {
            console.error('Error card:', error);
        }
    }

    return (
        <div className="w-full pt-[30px]">
            <div className="w-[80%] mx-[auto]">
                <div className="text-2xl border-b-4 pb-2">
                    Giỏ hàng của bạn
                </div>
                <div className="w-full flex flex-row grid grid-cols-12 items-center py-[20px] mb-[20px] border-b-2">
                    <div className="col-span-6 h-[60px] flex items-center justify-start gap-5">
                        <div className="flex items-center justify-center">
                            Sản phẩm
                        </div>
                    </div>

                    <div className="col-span-2">Giá</div>
                    <div className="col-span-2 mb-0">
                        Số Lượng
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                    </div>
                </div>
                <div className="w-full">
                    {cartItem && cartItem.map((item: any, index: number) => (
                        <CartItem
                            key={index}
                            data={item}
                            cartId={user?.data?.cartId}
                        />
                    ))}
                </div>
                <div className="w-full pb-[20px] flex justify-between">
                    <div className="text-2xl">
                        Tổng tiền :{total}
                    </div>
                    <Link href="/order">

                        <Button className="w-[160px] py-[10px] bg-[#e10908] text-[#ffffff]">Tạo Đơn</Button>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Cart