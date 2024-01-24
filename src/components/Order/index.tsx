import { Button, Select } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

const Order = () => {
    return (
        <div className="w-full pt-[30px]">
            <div className="w-[80%] mx-[auto]">
                <div className="text-2xl border-b-4 pb-2">
                Đơn hàng của bạn
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
                        tổng tiền
                    </div>
                </div>
                <div className="w-full">
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
                                Nhật ký thảo nguyên
                            </div>
                        </div>

                        <div className="col-span-2">250,000 đồng</div>
                        <div className="col-span-2 mb-0">
                            12
                        </div>
                        <div className="col-span-2 flex items-center justify-center">
                            10000000
                        </div>
                    </div>
                </div>

                <div className="w-full">

                    <div className="w-max">
                        <Select
                            label="Phương thức thanh toán"
                            placeholder="Chọn Phương thức thanh toán"
                            searchable
                            data={['Chuyển khoản', 'Thanh toán trực tiếp', 'Thanh toán qua QR']}
                        />
                    </div>
                    <div className="w-max">
                        <Select
                            label="Đơn vị vận chuyển"
                            placeholder="Chọn đơn vị vận chuyển"
                            searchable
                            data={['Giao Hàng Nhanh', 'Viettel Post', 'J&T Express', 'Ninja Van']}
                        />
                    </div>
                </div>
                <div className="w-full pb-[20px] flex justify-between">
                    <div className="text-2xl">
                        Tổng Đơn : 300000
                    </div>
                    <Button className="w-[160px] py-[10px] bg-[#e10908] text-[#ffffff]">Đặt Hàng</Button>
                </div>
            </div>
        </div>
    )
}

export default Order