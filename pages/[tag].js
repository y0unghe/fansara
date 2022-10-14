import React from 'react'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Modal from '../components/Modal';
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Login from '../components/Login';
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Post from '../components/Post';
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    where,
    query,
    limit,
    getDocs
} from "@firebase/firestore";
import Widgets from '../components/Widgets';

function UserPage() {
    const isOpen = useRecoilValue(modalState);
    const router = useRouter();
    const { tag } = router.query;
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();

    // const getPosts = async () => {
    //     const q = query(collection(db, "posts"),
    //         where("tag", "==", session.user.tag),
    //         orderBy("timestamp", "desc"),
    //         limit(10));

    //     const querySnapshot = await getDocs(q);
    //     const docs = querySnapshot.size();
    // }

    useEffect(
        () =>
            onSnapshot(query(collection(db, "posts"),
                where("tag", "==", session.user.tag),
                orderBy("timestamp", "desc"),
                limit(10)), (snapshot) => {
                    setPosts(snapshot.docs);
                }), [db, tag]
    )

    // useEffect(
    //     () => {
    //         getPosts();
    //     }, [db, tag]
    // );

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='min-h-screen flex max-w-[1500px] mx-auto'>
                <Sidebar />
                <div className='ml-[340px] flex-grow border-l border-r border-gray-200 border-1'>
                    <div className='flex sticky top-0 z-50 bg-white flex-row space-x-3 m-3'>
                        <ArrowLeftIcon
                            onClick={() => router.push("/")}
                            className='w-5 cursor-pointer hover:text-blue-500' />
                        <div className='flex flex-col'>
                            <h1 className='text-lg'>{session.user.name}</h1>
                            <div className='flex flex-row space-x-1 text-xs'>
                                <span>1.1K Posts</span>
                                <span>233.4K Likes</span>
                                <span>1.22M Fans</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-start mx-5 mt-20 space-y-3 pb-5'>
                        <img
                            className='rounded-full h-20 w-20'
                            src={session.user.image}
                            alt={session.user.name} />
                        <div className='flex flex-col'>
                            <h1 className='text-lg font-medium'>{session.user.name}</h1>
                            <span className='text-gray-400 text-sm'>@{session.user.tag}</span>
                        </div>
                    </div>
                    <div className='flex flex-col px-5 space-y-3 border-y-[1px] border-y-gray-200 py-5'>
                        <p className='text-gray-400 text-sm'>Subscribe</p>
                        <div className='flex flex-row cursor-pointer hover:bg-blue-600 items-center text-white px-5 text-sm justify-between h-[50px] rounded-full bg-blue-500'>
                            <span>Subscribe</span>
                            <span>Free</span>
                        </div>
                    </div>

                    <div className='pb-72'>
                        {
                            posts.map((post) => (
                                <Post isPostPage={false} key={post.id} id={post.id} post={post.data()} />
                            ))
                        }
                    </div>
                </div>
                <Widgets />
                {isOpen && <Modal />}
            </main>
        </div>
    )
}

export default UserPage

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
}