import { collection, limit, onSnapshot, orderBy, query, getDocs, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Input from './Input'
import Post from "./Post";
import InfiniteScroll from 'react-infinite-scroller';
import ColorRingLoader from "../components/ColorRingLoader";
import { useSession } from 'next-auth/react';

function Feed() {
    const [posts, setPosts] = useState([]);
    const [last, setLast] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    const { data: session } = useSession();

    const limitCount = 20;

    // useEffect(
    //     () =>
    //         onSnapshot(
    //             query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(limitCount)),
    //             async (snapshot) => {
    //                 const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    //                 setLast(lastVisible);

    //                 setPosts(snapshot.docs);
    //             }), [db]
    // );

    const getSubscribedPosts = async () => {
        const q = query(collection(db, "users", session.user.uid, "subscriptions"), limit(10));
        const snapshot = await getDocs(q);
        const ids = snapshot.docs.map((doc) => {
            const data = doc.data();
            const timestamp = data.timestamp;
            const expiredAt = new Date(timestamp);
            const now = Date.now;
            const expired = expiredAt > now;
            console.log(expired);
            if (!expired) {
                return data.uid;
            }
        });
        console.log(ids);

        const postQuery = query(collection(db, "posts"), where("id", "in", ids), limit(limitCount));
        const postSnapshot = await getDocs(postQuery);
        const postDocs = postSnapshot.docs;
        setPosts(postDocs);
    }

    useEffect(() => {
        getSubscribedPosts()
    }, [db]);

    const loadMorePosts = async () => {

    }

    // const loadNextPage = async () => {
    //     if (!last) {
    //         return;
    //     }

    //     const next = query(collection(db, "posts"), orderBy("timestamp", "desc"),
    //         startAfter(last),
    //         limit(limitCount));

    //     const snapshot = await getDocs(next);
    //     const docs = snapshot.docs;

    //     if (docs.length === 0) {
    //         setHasMore(false);
    //         return;
    //     }

    //     const lastVisible = docs[docs.length - 1];
    //     setLast(lastVisible);

    //     const morePosts = [...posts, ...docs];
    //     setPosts(morePosts);
    //     setHasMore(true);
    // }

    return (
        <div className=' ml-[300px] flex-grow border-l border-r border-gray-200 border-1 max-w-[600px]'>
            <div className='bg-white top-0 z-50 text-black font-bold p-4 border-b border-1 border-gray-200 sticky'>
                Home
            </div>
            <Input />
            <div className='pb-72'>
                <InfiniteScroll
                    hasMore={true}
                    loadMore={loadMorePosts}
                    loader={hasMore ?? <div key={0} className="flex justify-center py-5"><ColorRingLoader /></div>}
                    pageStart={0}>
                    {
                        posts.map((post) => (
                            <Post isPostPage={false} key={post.id} id={post.id} post={post.data()} />
                        ))
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Feed