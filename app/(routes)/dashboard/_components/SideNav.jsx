'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { CircleGauge, PiggyBank, Receipt, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const SideNav = () => {
    const menuList =[
        {
            id: 1,
            name:'Dashboard',
            icon:CircleGauge,
            path:'/dashboard'
        },
        {
            id:2,
            name:"Budgets",
            icon:PiggyBank,
            path:'/dashboard/budgets'
        },
        {
            id:3,
            name:"Expenses",
            icon:Receipt,
            path:'/dashboard/expenses'
        },
        {
            id:4,
            name:"Upgrade",
            icon:ShieldCheck,
            path:'/dashboard/upgrade'
        }
    ]

    const path=usePathname();

    useEffect(() => {
        console.log(path)
    }, [path])


  return (
    <div className="h-screen p-5 border shadow-md ">
        <Image src='/images/IMG_0364.jpg' className='rounded-full'
        alt='logo'
        width={120}
        height={100} 
        />
        <div className='mt-5' >
            {menuList.map((menu, index) =>(
                <Link href={menu.path}>
                <h2 className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-5 cursor-pointer rounded-md hover:text-white hover:bg-blue-900 ${path==menu.path&&'text-gray-500 bg-blue-100'} `}>
                    <menu.icon/>
                    {menu.name}
                </h2>
                </Link>
            ))}
            
           
        </div>
        <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
            <UserButton/>
            Profile
        </div>
    </div>
  )
}

export default SideNav