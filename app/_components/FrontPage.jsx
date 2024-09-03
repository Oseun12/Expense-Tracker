import React from 'react';
import SideNav from '../(routes)/dashboard/_components/SideNav';
import Hero from './Hero';
import Header from './Header';

function FrontPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className='w-full'>
        <Header />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className='w-64 border-r shadow-md'>
          <SideNav />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-10">
          <Hero />
        </main>
      </div>
    </div>
  );
}

export default FrontPage;
