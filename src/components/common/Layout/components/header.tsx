import { Button, Modal } from '@mantine/core'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { CartIcon } from '../../icon/cart-icon'
import { useDisclosure } from '@mantine/hooks'
import { AppDispatch, RootState } from '@src/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import { logout, setUserDetails } from '@src/redux/slices/loginSlice'
import { useRouter } from 'next/router'
import { useGetListCartMutation } from '@src/redux/endPoint/card'
const Header = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>();
    const userDetail = useSelector((state: RootState) => state.auth.details);
    const user = useSelector((state: RootState) => state.auth.data);
    const [getListCart] = useGetListCartMutation();
    const [fullname, setFullname] = useState<string>('')
    const [cartItem, setCartItem] = useState<any>()
    useEffect(() => {
        if (userDetail) {
            const fullname: string = userDetail.fullname.lastname + " " + userDetail.fullname.firstname
            setFullname(fullname)
            getCartByCusID(userDetail._id)
        }

    }, [user, userDetail, cartItem, fullname, router])

    const getCartByCusID = async (id: any) => {
        try {
            const res: any = await getListCart(id);
            if (res) {
                setCartItem(res.data.items.length as number)
            }
        } catch (error) {
            console.error('Error card:', error);
        }
    }
    const handleLogout = () => {
        dispatch(logout());
        dispatch(setUserDetails(null));
        setFullname("")
        setCartItem("")
        router.push("/")
    };
    const menu = [
        {
            name: "Books",
            path: "/staff",
        },
        {
            name: "Users",
            path: "/staff/user-controller",
        },
    ];

    return (
        <div className="w-full shadow-md">
            <div className="w-[80%] mx-[auto] py-[16px] flex flex-row justify-between justify-items-center">
                <div className="bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 flex items-center">
                    <Link
                        href="/"
                        className="text-4xl font-extrabold text-transparent mr-8"
                    >
                        Book shop
                    </Link>
                    {router.asPath.includes("/staff") && (
                        <div className="flex flex-row gap-4 items-center pt-2">
                            {menu.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => router.push(item.path)}
                                    className={`cursor-pointer ${router.asPath === item.path
                                            ? "bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 underline"
                                            : ""
                                        }`}
                                >
                                    <div className="cursor-pointer">{item.name}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-max flex gap-4 flex-row items-center justify-between justify-items-center">
                    <div className="flex gap-4 flex-row items-center justify-between justify-items-center">
                        <div> {fullname}</div>
                        <div >
                            <Link className="relative block w-max" href="/cart">
                                <CartIcon size={26} fill='#000000' />
                                {cartItem > 0 && <div className="absolute -top-[15px] -right-[10px] flex justify-center w-[24px] h-[24px] text-[16px] text-center bg-[#e20707] text-[#ffffff] rounded-full">
                                    {cartItem}
                                </div>}
                            </Link>

                        </div>
                    </div>

                    {
                        !user ?
                            <Link href="/login">
                                <Button
                                    className="w-max h-[42px] max-h-full rounded-md bg-[#d7348b] px-[10px] text-[#ffffff]"
                                >
                                    Đăng nhập</Button>
                            </Link>
                            :
                            <Button
                                onClick={handleLogout}
                                className="w-max h-[42px] max-h-full rounded-md bg-[#d7348b] px-[10px] text-[#ffffff]"
                            >
                                Đăng xuất</Button>
                    }
                </div>
            </div>

        </div>
    )
}

export default Header