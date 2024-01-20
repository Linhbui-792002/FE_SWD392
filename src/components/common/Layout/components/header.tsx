import { Button, Modal } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { CartIcon } from '../../icon/cart-icon'
import { useDisclosure } from '@mantine/hooks'

const Header = () => {
    // const storedUser = localStorage.getItem('user');

    // // Kiểm tra xem có dữ liệu trong localStorage không
    // if (storedUser) {
    //     // Chuyển chuỗi JSON thành đối tượng JavaScript
    //     const retrievedUser = JSON.parse(storedUser);
    // }
    return (
        <div className="w-full shadow-md">
            <div className="w-[80%] mx-[auto] py-[16px] flex flex-row justify-between justify-items-center">
                <div className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <Link href="/">
                        Book shop
                    </Link>
                </div>
                <div className="w-max flex gap-4 flex-row items-center justify-between justify-items-center">
                    <div className="flex gap-4 flex-row items-center justify-between justify-items-center">
                        Linh Bui
                        <div >
                            <Link className="relative block w-max" href="/cart">
                                <CartIcon size={26} fill='#000000' />
                                <div className="absolute -top-[15px] -right-[10px] flex justify-center w-[24px] h-[24px] text-[16px] text-center bg-[#e20707] text-[#ffffff] rounded-full">
                                    20
                                </div>
                            </Link>

                        </div>
                    </div>

                    <div>
                        <Link href="/login">
                            <Button
                                className="w-max h-[42px] max-h-full rounded-md bg-[#d7348b] px-[10px] text-[#ffffff]"
                            >
                                Đăng nhập</Button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header