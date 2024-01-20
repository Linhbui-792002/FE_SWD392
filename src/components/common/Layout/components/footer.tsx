import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className="w-full h-[200px] flex px-[50px] py-[30px] bg-[#efdbdf] shadow-md">
            <div className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                <Link href="/">
                    Book shop
                </Link>
            </div>
        </div >
    )
}

export default Footer