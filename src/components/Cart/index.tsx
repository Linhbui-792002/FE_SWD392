import React from 'react'
import CartItem from './components/CartItem'
import { Button } from '@mantine/core'
import Link from 'next/link'

const Cart = () => {
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
                    {Array.from(new Array(3)).map((_, index) => (
                        <CartItem
                            key={index}
                        />
                    ))}
                </div>
                <div className="w-full pb-[20px] flex justify-between">
                    <div className="text-2xl">
                        Tổng tiền : 300000
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