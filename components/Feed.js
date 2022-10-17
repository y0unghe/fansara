import { collection, limit, onSnapshot, orderBy, query, getDocs, startAfter } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Input from './Input'
import Post from "./Post";

function Feed() {
    const [posts, setPosts] = useState([]);
    const [last, setLast] = useState(null);

    const limitCount = 2;

    useEffect(
        () =>
            onSnapshot(
                query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(limitCount)),
                async (snapshot) => {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    setLast(lastVisible);

                    setPosts(snapshot.docs);
                }), [db]
    );

    const loadNextPage = async () => {
        if (!last) {
            return;
        }
        const next = query(collection(db, "posts"), orderBy("timestamp", "desc"),
            startAfter(last),
            limit(limitCount));

        const snapshot = await getDocs(next);
        const docs = snapshot.docs;

        if (docs.length === 0) {
            return;
        }

        const lastVisible = docs[docs.length - 1];
        setLast(lastVisible);

        const morePosts = [...posts, ...docs];
        setPosts(morePosts);
    }

    return (
        <div className=' ml-[300px] flex-grow border-l border-r border-gray-200 border-1 max-w-[600px]'>
            <div className='bg-white top-0 z-50 text-black font-bold p-4 border-b border-1 border-gray-200 sticky'>
                Home
                <button onClick={loadNextPage}>Test</button>
            </div>
            <Input />
            <div className='pb-72'>
                {
                    posts.map((post) => (
                        <Post isPostPage={false} key={post.id} id={post.id} post={post.data()} />
                    ))
                }
            </div>
        </div>
    )
}

export default Feed