import { TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { useGetOneUserMutation } from '@src/redux/endPoint/accounts';
import { useLoginMutation } from '@src/redux/endPoint/login';
import { loginSuccess, setUserDetails } from '@src/redux/slices/loginSlice';
import { AppDispatch, RootState } from '@src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.data);
    const router = useRouter()
    const [login] = useLoginMutation();
    const [getOneUser] = useGetOneUserMutation();
    const {
        control,
        register,
        formState: { errors },
        handleSubmit: handleSubmitLogin,
        reset,
        setValue,
    } = useForm();

    const onSubmit = async (data: any) => {
        try {
            // const dataSubmit = { ...data, id: managerIt.id };
            const res = await login(data).unwrap();
            if (res.data) {
                const user: any = await getOneUser(res.data.customerId)
                if (user) {
                    dispatch(loginSuccess(res));
                    const userDetail = user.data;
                    dispatch(setUserDetails(userDetail));
                    router.push("/")
                    notifications.show({
                        title: 'Thành công',
                        color: '#06d6a0',
                        autoClose: 2000,
                        message: 'Đăng nhập thành công',
                    });
                }
            }
        } catch (error: any) {
            notifications.show({
                title: 'Lỗi',
                color: '#ef476f',
                autoClose: 2000,
                message: "Sai tài khoản mật khẩu",
            });
        }
    }


    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
            <section >
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6">
                            <h1 className="pb-6 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đăng Nhập Với Tài Khoản Của Bạn
                            </h1>

                            <form onSubmit={handleSubmitLogin(onSubmit)} className="w-full flex flex-col gap-2">
                                <TextInput
                                    className="w-full"
                                    label="Email"
                                    mt="md"
                                    placeholder="Nhập Email"
                                    required
                                    {...register('username', {
                                        required: 'Không được để trống ',
                                    })}
                                />
                                <TextInput
                                    className="w-full"
                                    label="Mật Khẩu"
                                    mt="md"
                                    placeholder="Nhập Mật Khẩu"
                                    required
                                    {...register('password', {
                                        required: 'Không được để trống ',
                                    })}
                                />
                                <button type="submit" className="w-full text-white bg-[#d7348b] hover:bg-[#f83da0] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Bạn không có tài khoản? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng Ký</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login