import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { ArrowLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import Sidebar from '../../components/Sidebar'
import { getSession, useSession } from "next-auth/react";
import Head from 'next/head'
import { db } from '../../firebase'
import { updateDoc, doc } from 'firebase/firestore';

function Subscription() {
    const router = useRouter();
    const { data: session } = useSession();
    const [price, setPrice] = useState(null);

    const save = async () => {
        const docRef = doc(db, "users", session.user.uid);

        await updateDoc(docRef, {
            pricePerMonth: price
        })

        router.push('/settings/profile');
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='min-h-screen flex max-w-[1500px] mx-auto'>
                <Sidebar />
                <div className='ml-[340px] w-[350px] border-l border-r border-gray-200 border-1'>
                    <div className='top-0 z-50 bg-white text-black font-bold p-4 border-b border-1 border-gray-200 sticky'>
                        <div
                            className=" hover:text-blue-500 px-0 cursor-pointer"
                            onClick={() => router.push("/")}
                        >
                            <div className='flex space-x-2 items-center'>
                                <ArrowLeftIcon className='w-5 h-5' />
                                <h1 className='font-bold text-lg'>Settings</h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col divide-y-2 divide-gray-200'>
                        <div
                            onClick={() => router.push("/settings/profile")}
                            className='px-5 py-2 flex justify-between items-center hover:bg-blue-100 cursor-pointer'>
                            <h1>Profile</h1>
                            <ChevronRightIcon className='text-gray-500 w-5' />
                        </div>
                        <div className='px-5 py-2 flex justify-between items-center hover:bg-blue-100 cursor-pointer'>
                            <h1>Account</h1>
                            <ChevronRightIcon className='text-gray-500 w-5' />
                        </div>
                    </div>
                </div>
                <div className='flex-grow'>
                    <div className='top-0 z-50 bg-white text-black font-bold p-4 border-b border-1 border-gray-200 sticky'>
                        <div
                            className=" hover:text-blue-500 px-0 cursor-pointer"
                            onClick={() => router.push("/")}
                        >
                            <div className='flex space-x-2 items-center'>
                                <h1 className='font-bold text-lg'>Subscription</h1>
                            </div>
                        </div>
                    </div>
                    <div className='p-5 border-b-2 border-gray-100 flex flex-col space-y-5'>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2" htmlFor="email">
                                Price per month
                            </label>
                            <div className='flex flex-row items-center space-x-2 text-gray-300'>
                                <span>$</span>
                                <input
                                    onChange={(e) => {
                                        const price = e.target.value;
                                        setPrice(price);
                                    }}
                                    value={price}
                                    placeholder='Free'
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="number" />
                            </div>
                        </div>
                        <div className='flex flex-row justify-end space-x-5'>
                            <button className='text-blue-500 hover:text-blue-600'>Cancel</button>
                            <button
                                onClick={save}
                                disabled={!price}
                                className={`text-white ${price ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"}   px-5 py-2 rounded-full`}>Save</button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Subscription

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
}