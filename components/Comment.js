import React, { useEffect, useState } from 'react'
import Moment from "react-moment";
import {
    EllipsisHorizontalIcon,
    HeartIcon
} from '@heroicons/react/24/outline'
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    setDoc,
} from "@firebase/firestore";
import { db } from "../firebase";
import { useSession } from 'next-auth/react'
import {
    HeartIcon as HeartIconFilled
} from '@heroicons/react/24/solid';

function Comment({ postId, id, comment }) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const { data: session } = useSession();

    const likeComment = async () => {
        if (liked) {
            await deleteDoc(doc(db, "posts", postId, "comments", id, "likes", session.user.uid));
        } else {
            await setDoc(doc(db, "posts", postId, "comments", id, "likes", session.user.uid), {
                username: session.user.name
            });
        }
    }

    useEffect(
        () =>
            onSnapshot(collection(db, "posts", postId, "comments", id, "likes"), (snapshot) =>
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

    return (
        <div
            className={`flex flex-col py-5 space-y-5 border-b-2 border-gray-100`}>
            {/* Header */}
            <div className='flex flex-row justify-between items-center px-5'>
                {/* 用户信息 */}
                <div className='flex flex-row space-x-2 cursor-pointer group'>
                    <img
                        src={comment?.userImg}
                        alt=""
                        className="h-11 w-11 rounded-full"
                    />
                    <div className='flex flex-col'>
                        <h1 className='font-medium'>{comment.username}</h1>
                        <span
                            className='text-gray-400 text-sm group-hover:underline group-hover:text-blue-500'>
                            @{comment.tag}
                        </span>
                    </div>
                </div>
                {/* Time ago and more */}
                <div className='flex flex-row space-x-2 items-center'>
                    <span className='text-xs text-gray-400'>
                        <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
                    </span>
                    <EllipsisHorizontalIcon
                        className='w-6 text-gray-500 cursor-pointer hover:bg-blue-300 hover:bg-opacity-10'
                    />
                </div>
            </div>
            {/* Post Content */}
            <p className='px-5'>
                {comment.comment}
            </p>
            {/* Post Image */}
            {
                comment.image && (
                    <img
                        src={comment?.image}
                        alt=""
                        className="max-h-[300px] object-cover"
                    />
                )
            }
            {/* Post Actions */}
            <div className='flex flex-row justify-between px-5'>
                <div className='flex flex-row space-x-5'>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            likeComment();
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
                </div>
            </div>
        </div>
    )
}

export default Comment