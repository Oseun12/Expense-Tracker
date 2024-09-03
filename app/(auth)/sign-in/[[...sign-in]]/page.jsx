'use client'

import { SignIn, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function SignInPage() {
    const {isSignedIn, signIn} = useSignIn();
    const router = useRouter();

    useEffect(() => {
        if (isSignedIn) {
            router.push('/(router)/dashboard/')
        }
    })
  return (
    <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
                alt=""
                src="/images/money2.avif"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
                

                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to <span className="text-blue-700">MyBudget</span>
                </h2>

                <p className="mt-4 leading-relaxed text-white/90">
                    Join us on a journey to transform your financial management experience. At PowerSpending, we empower you with the tools and insights to take control of your finances with ease and confidence. Create an account today and start making smarter financial decisions for a brighter future.
                </p>

            </div>
            </section>

            <main
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 "
            >
            <div className="max-w-xl lg:max-w-3xl">
                <div className="relative  block lg:hidden">
            

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    Welcome to <span className="text-blue-700">MyBudget</span>
                </h1>

                <p className="mt-4 leading-relaxed text/90 mb-10">
                    Join us on a journey to transform your financial management experience. At PowerSpending, we empower you with the tools and insights to take control of your finances with ease and confidence. Create an account today and start making smarter financial decisions for a brighter future.
                </p>

                </div>
                <SignIn/>
                </div>
            </main>
        </div>
    </section>
  );
}
