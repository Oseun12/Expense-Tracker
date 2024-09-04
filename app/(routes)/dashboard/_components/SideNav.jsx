'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { CircleGauge, PiggyBank, Receipt, ShieldCheck, Menu, LetterText } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const SideNav = () => {
    const [isOpen, setIsOpen] = useState(false);  // State to control toggle on small screens
    const path = usePathname();

    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: CircleGauge,
            path: '/dashboard'
        },
        {
            id: 2,
            name: "Budgets",
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        // {
        //     id: 3,
        //     name: "Expenses",
        //     icon: Receipt,
        //     path: '/dashboard/expenses'
        // },
        {
            id: 4,
            name: "FeedBack",
            icon: LetterText,
            path: '/dashboard/feedback'
        }
    ]

    useEffect(() => {
        console.log(path)
    }, [path])

    return (
        <div className="flex">
            {/* Toggle button for small screens */}
            <div className="p-2 md:hidden">
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="text-gray-500 focus:outline-none"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Side Navigation */}
            <div className={`h-screen p-5 border shadow-md fixed top-0 left-0 z-40 bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block md:w-64`}>
                <Image 
                    src='/images/IMG_0364.jpg' 
                    className='rounded-full'
                    alt='logo'
                    width={120}
                    height={100} 
                />
                <div className='mt-5'>
                    {menuList.map((menu) => (
                        <Link key={menu.id} href={menu.path}>
                            <h2 className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-5 cursor-pointer rounded-md hover:text-white hover:bg-cyan-900 ${path === menu.path && 'text-gray-500 bg-cyan-100'}`}>
                                <menu.icon />
                                {menu.name}
                            </h2>
                        </Link>
                    ))}
                </div>
                <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
                    <UserButton />
                    Profile
                </div>
            </div>

            <div className="flex-1 ml-0 md:ml-64">
                <div className="p-4">
                   
                </div>
            </div>

            {isOpen && <div 
                className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
                onClick={() => setIsOpen(false)}
            />}
        </div>
    )
}

export default SideNav
