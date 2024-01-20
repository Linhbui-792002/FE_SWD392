import { Button } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
type Props = {
    className?: string
}
const Product = ({ className }: Props) => {
    return (
        <div className={className}>
            <div className="relative w-full">
                <Image alt='anh book' width={320} height={600} src='https://marketplace.canva.com/EAD5DANBwv4/1/0/1003w/canva-xanh-l%C3%A1-l%C3%A1-c%C3%A2y-c%E1%BA%A7u-nguy%E1%BB%87n-nh%E1%BA%ADt-k%C3%BD-s%C3%A1ch-b%C3%ACa-lH-O_A1xreI.jpg' />
                <div className="absolute z-10 bottom-0 w-full bg-[#FFFFFF]/80">
                    <div className="px-[10px] py-[10px]">
                        <div>
                            Tên Sách: Nhật Ký của tôi
                        </div>
                        <div>
                            tác giả: Linhbui
                        </div>
                        <div>
                            Giá bán: 2000000 đồng
                        </div>
                        <div>
                            <Button
                                className="w-full h-[42px] max-h-full rounded-md bg-[#d7348b] px-[10px] text-[#ffffff] hover:bg-[#f83da0]"
                            >Thêm Giỏ Hàng</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product