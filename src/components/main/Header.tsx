'use client'

import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <div className='text-[rgb(50,50,50)]'>

            {/* Large screens */}
            <div className='fixed w-[80vw] h-[80px] bg-gray-200 rounded-full my-[25px] px-[30px] backdrop-blur-md hidden md:flex z-50'>
                <div className='w-full h-full flex items-center justify-between'>
                    <div className='flex items-center justify-between w-[500px]'>
                        <Link href='/' className=' text-[40px] h-full flex items-center'>shortie</Link>

                        <div className='h-full w-[300px]'>

                            <details className="dropdown ">
                                <summary className="cursor-pointer ">Product</summary>
                                <ul className="menu dropdown-content bg-white z-1 w-52 mt-[20px] p-2 shadow-sm rounded-lg">
                                    <li><Link href='/dashboard'>Dashboard</Link></li>
                                    <li><Link href='/create-new'>Create</Link></li>
                                </ul>
                            </details>

                        </div>
                    </div>

                    <div className='h-full flex items-center justify-center  gap-[15px]'>
                        <Link href='/auth/login' className='px-[15px] py-[10px] rounded-full text-[rgb(50,50,50)] bg-white cursor-pointer'>Login</Link>
                        <Link href='/auth/register' className='px-[15px] py-[10px] rounded-full bg-[rgb(50,50,50)] text-white cursor-pointer'>Register</Link>
                    </div>

                </div>
            </div>

            {/* Small screens */}
            <div className='fixed w-full top-0 left-0 h-[80px] bg-gray-200 px-[30px] backdrop-blur-lg flex md:hidden z-50'>
                <div className='w-full h-full flex items-center justify-between'>
                    <Link href='/' className=' text-[30px]'>shortie</Link>

                    <div className='h-full flex items-center justify-around  gap-4'>
                        <div className='h-full flex items-center justify-center  gap-[15px]'>
                            <Link href='/auth/login' className='px-[15px] py-[10px] rounded-full text-[rgb(50,50,50)] bg-white cursor-pointer'>Login</Link>
                            <Link href='/auth/register' className='px-[15px] py-[10px] rounded-full bg-[rgb(50,50,50)] text-white cursor-pointer'>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Header
