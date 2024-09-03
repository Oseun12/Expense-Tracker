import { UserButton } from '@clerk/nextjs'
import React from 'react'
import SideNav from './SideNav'


const DashboardHeader = () => {
  return (
    <div className='p-5 shadow-md border-b flex justify-between'>
        <div>
        <div className="flex flex-1">
        {/* Sidebar */}
        <div className=' '>
          <SideNav />
        </div>
        </div>
        </div>
        <div>
            <UserButton/>
        </div>
    </div>
  )
}

export default DashboardHeader