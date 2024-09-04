"use client"
import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

const Header = () => {

  const {user, isSignedIn}=useUser();
  return (
    <div className="p-5 flex justify-between items-center border shadow-md">
        <Image src="/images/IMG_0364.jpg" 
        alt="logo"
        width={120}
        height={100}
        />
        {isSignedIn? 
        <UserButton /> : 
        <Link href={'/sign-in'}>  
          <Button className='bg-cyan-900 hover:bg-cyan-700'>Get Started</Button> 
        </Link>
      }
        

    </div>
  )
}

export default Header