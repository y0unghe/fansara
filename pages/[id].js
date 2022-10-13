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
    query,
} from "@firebase/firestore";
import Comment from '../components/Comment';

function PostPage({ providers }) {
    const isOpen = useRecoilValue(modalState);
    const { data: session } = useSession();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const router = useRouter();
    const { id } = router.query;

    useEffect(
        () =>
            onSnapshot(doc(db, "posts", id), (snapshot) => {
                setPost(snapshot.data());
            }),
        [db]
    );

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "posts", id, "comments"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => setComments(snapshot.docs)
            ),
        [db, id]
    );

    if (!session) return <Login providers={providers} />;

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='min-h-screen flex max-w-[1500px] mx-auto'>
                <Sidebar />
                <div className=' ml-[340px] max-w-2xl flex-grow border-l border-r border-gray-200 border-1'>
                    <div className='text-black font-bold p-4 border-b border-1 border-gray-200 sticky'>
                        <div
                            className=" hover:text-blue-500 w-5 h-5 flex items-center justify-center px-0 cursor-pointer"
                            onClick={() => router.push("/")}
                        >
                            <ArrowLeftIcon />
                        </div>
                    </div>
                    <div className='pb-72'>
                        {
                            post && (
                                <Post id={id} post={post} isPostPage={true} />
                            )
                        }
                        {comments.length > 0 && (
                            <div className="pb-72">
                                {comments.map((comment) => (
                                    <Comment
                                        key={comment.id}
                                        postId={id}
                                        id={comment.id}
                                        comment={comment.data()}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {isOpen && <Modal />}
            </main>
        </div>
    )
}

export default PostPage;

export async function getServerSideProps(context) {
    const providers = await getProviders();
    const session = await getSession(context);

    return {
        props: {
            providers,
            session,
        },
    };
}