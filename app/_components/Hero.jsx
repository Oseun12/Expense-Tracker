import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div>
        <section className=" flex items-center flex-col">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
                <div className="mx-auto max-w-xl text-center">
                <h1 className="text-3xl font-extrabold sm:text-5xl">
                    Manage my Expense.
                    <strong className="font-extrabold text-5xl md:text-6xl text-cyan-900 sm:block">
                        My  
                        <span className='bg-yellow-600 py-2 text-white text-5xl  inline-block transform -rotate-6'>
                             MoNey 
                        </span> 
                         My VoiCe My PoWer!!!
                        </strong>

                </h1>

                <p className="mt-4 sm:text-xl/relaxed">
                Get yourself a wise spending habit
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <a
                    className="block w-full rounded bg-cyan-900 px-12 py-3 text-sm font-medium text-white shadow hover:bg-cyan-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                    href="/dashboard"
                    >
                    Get Started
                    </a>

                </div>
                </div>
            </div>
            <div className="features-section mt-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="feature-item text-center ">
                    <img src="/images/budget.png" alt="Budget Icon" className="mx-auto mb-4 w-28 h-28"/>
                    <h3 className="text-lg font-bold">Track Your Spending</h3>
                    <p>Get a detailed overview of where your money goes.</p>
                </div>
                <div className="feature-item text-center">
                    <img src="/images/saving2.png" alt="Saving Icon" className="mx-auto mb-4 w-28 h-28"/>
                    <h3 className="text-lg font-bold">Save More</h3>
                    <p>Set savings goals and watch your money grow.</p>
                </div>
                <div className="feature-item text-center">
                    <img src="/images/control.png" alt="Control Icon" className="mx-auto mb-4 w-28 h-28"/>
                    <h3 className="text-lg font-bold">Take Control</h3>
                    <p>Be the master of your finances with our tools.</p>
                </div>
                </div>

        </section>
    </div>
  )
}

export default Hero