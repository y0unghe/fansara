import React from 'react'
import { signIn } from "next-auth/react";

function Login({ providers }) {
    console.log(providers);

    return (
        <div className=' flex flex-1 min-h-screen'>
            <div className=' w-1/2 bg-[#2DAFF0] flex justify-center '>
                <div className='flex flex-col w-[344px] mt-[70px] gap-3'>
                    <div className='flex flex-row'>
                        <h1 className='text-white text-5xl font-bold'>Fansara</h1>
                    </div>
                    <p className='text-white text-3xl'>
                        Sign up and follow your favorite fans
                    </p>
                </div>
            </div>
            <div className=' w-1/2 flex flex-col items-center mt-[70px]'>
                <div className='flex flex-col w-[344px] gap-10'>
                    <div className='flex flex-col gap-4'>
                        <span className='font-bold'>Sign In</span>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Password" />
                        </div>
                    </div>
                    <button
                        onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                        className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Sign In</span>
                        <span className="relative invisible">Sign In</span>
                    </button>
                    {/* <button className='bg-blue-500 text-white rounded-full py-2'>Sign In</button> */}
                    <div className='flex flex-row items-center gap-3 justify-center text-sm'>
                        <button className='text-blue-500'>Forgot Password</button>
                        <div className='w-1 h-1 bg-gray-500 rounded-full'></div>
                        <button className='text-blue-500'>Sign Up</button>
                    </div>
                    {Object.values(providers).map(provider => {
                        return (
                            <button key={provider.id} className="inline-flex overflow-hidden bg-blue-500 text-white rounded group">
                                <span className="px-3.5 py-2 text-white bg-purple-500 group-hover:bg-purple-600 flex items-center justify-center">
                                    <span className='font-bold'>G</span>
                                </span>
                                <span className="pl-4 pr-5 py-2.5">Sign in with {provider.name}</span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Login