import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Input from './Input'
import Post from "./Post";

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(
        () =>
            onSnapshot(
                query(collection(db, "posts"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setPosts(snapshot.docs);
                }), [db]
    );

    return (
        <div className=' ml-[340px] max-w-2xl flex-grow border-l border-r border-gray-200 border-1'>
            <div className='text-black font-bold p-4 border-b border-1 border-gray-200 sticky'>
                Home
            </div>
            <Input />
            <div className='pb-72'>
                {
                    posts.map((post) => (
                        <Post key={post.id} id={post.id} post={post.data()} />
                    ))
                }
            </div>
        </div>
    )
}

export default Feed