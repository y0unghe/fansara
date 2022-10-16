import {
    BookmarkIcon,
    ChatBubbleOvalLeftIcon,
    EllipsisHorizontalIcon,
    HeartIcon
} from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import {
    HeartIcon as HeartIconFilled,
    BookmarkIcon as BookmarkIconFilled
} from '@heroicons/react/24/solid';
import Moment from "react-moment";
import { useSession } from 'next-auth/react'
import { useSetRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { useRouter } from 'next/router';
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    setDoc,
    serverTimestamp
} from "@firebase/firestore";
import { db } from "../firebase";
import { LinkIt } from 'react-linkify-it';

function Post({ id, post, isPostPage }) {
    const { data: session } = useSession();
    const setIsOpen = useSetRecoilState(modalState);
    const setPostId = useSetRecoilState(postIdState);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const [bookmarked, setBookmarked] = useState(false);
    const [comments, setComments] = useState([]);

    const router = useRouter();

    const likePost = async () => {
        if (liked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
        } else {
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.name
            });
        }
    }

    const bookmark = async () => {
        if (bookmarked) {
            await deleteDoc(doc(db, "users", session.user.uid, "bookmarks", id));
        } else {
            await setDoc(doc(db, "users", session.user.uid, "bookmarks", id), {
                postId: id,
                timestamp: serverTimestamp()
            });
        }
    }

    useEffect(
        () =>
            onSnapshot(collection(db, "posts", id, "comments"), (snapshot) =>
                setComments(snapshot.docs)
            ),
        [db, id]
    )

    useEffect(
        () =>
            onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
                setLikes(snapshot.docs)
            ),
        [db, id]
    );

    useEffect(
        () =>
            setLiked(
                likes.findIndex((like) => like.id === session.user.uid) !== -1
            ),
        [likes]
    );

    useEffect(
        () =>
            onSnapshot(doc(db, 'users', session.user.uid, 'bookmarks', id), (snapshot) => {
                setBookmarked(snapshot.exists());
            })
        , [db]
    );

    return (
        <div
            onClick={() => isPostPage ? null : router.push(`/${post.tag}/status/${id}`)}
            className={`flex flex-col py-5 space-y-5 border-b-2 border-gray-100 ${!isPostPage && "cursor-pointer"}`}>
            {/* Header */}
            <div className='flex flex-row justify-between items-center px-5'>
                {/* 用户信息 */}
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/${post.tag}`);
                    }}
                    className='flex flex-row space-x-2 cursor-pointer group'>
                    <img
                        src={post?.userImg}
                        alt=""
                        className="h-11 w-11 rounded-full"
                    />
                    <div className='flex flex-col'>
                        <h1 className='font-medium'>{post.username}</h1>
                        <span
                            className='text-gray-400 text-sm group-hover:underline group-hover:text-blue-500'>
                            @{post.tag}
                        </span>
                    </div>
                </div>
                {/* Time ago and more */}
                <div className='flex flex-row space-x-2 items-center'>
                    <span className='text-xs text-gray-400'>
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                    </span>
                    <EllipsisHorizontalIcon
                        className='w-6 text-gray-500 cursor-pointer hover:bg-blue-300 hover:bg-opacity-10'
                    />
                </div>
            </div>
            {/* Post Content */}
            <p className='px-5'>
                <LinkIt
                    component={(match) => {
                        return (
                            <span
                                key={match}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/${match.substring(1)}`)
                                }}
                                className='text-blue-500 hover:underline cursor-pointer'>{match}</span>
                        )
                    }}
                    regex={/@([\w_]+)/}>
                    <LinkIt
                        component={(match) => {
                            return (
                                <span
                                    key={match}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(match)
                                    }}
                                    className='text-blue-500 hover:underline cursor-pointer'>{match}</span>
                            )
                        }}
                        regex={/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi}>
                        {post.text}
                    </LinkIt>
                </LinkIt>
            </p>
            {/* Post Image */}
            {
                post.image && (
                    <img
                        src={post?.image}
                        alt=""
                        className="max-h-[700px] object-cover"
                    />
                )
            }
            {/* Post Actions */}
            <div className='flex flex-row justify-between px-5'>
                <div className='flex flex-row space-x-5'>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            likePost();
                        }}
                        className='flex flex-row space-x-2 items-center'>
                        {
                            liked ? (
                                <HeartIconFilled className="smallIcon text-red-500" />
                            ) : (
                                <HeartIcon className='smallIcon' />
                            )
                        }
                        {
                            likes.length > 0 && (
                                <span className=' text-gray-400 text-sm'>
                                    {likes.length}
                                </span>
                            )
                        }
                    </div>
                    <div
                        className='flex flex-row space-x-2 items-center'
                        onClick={(e) => {
                            e.stopPropagation();
                            setPostId(id);
                            setIsOpen(true);
                        }}>
                        <ChatBubbleOvalLeftIcon className='smallIcon' />
                        {
                            comments.length > 0 && (
                                <span className=' text-gray-400 text-sm'>
                                    {comments.length}
                                </span>
                            )
                        }
                    </div>
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    bookmark();
                }}>
                    {
                        bookmarked ? (
                            <BookmarkIconFilled className='smallIcon text-blue-500' />
                        ) : (
                            <BookmarkIcon className='smallIcon' />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Post