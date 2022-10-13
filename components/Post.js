import { BookmarkIcon, ChatBubbleOvalLeftIcon, EllipsisHorizontalIcon, HeartIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Moment from "react-moment";

function Post({ id, post }) {
    return (
        <div className='flex flex-col py-5 space-y-5 border-b-2 border-gray-100'>
            {/* Header */}
            <div className='flex flex-row justify-between items-center px-5'>
                {/* 用户信息 */}
                <div className='flex flex-row space-x-2 cursor-pointer group'>
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
            <p className='px-5'>
                {post.text}
            </p>
            <img
                src={post?.image}
                alt=""
                className="max-h-[300px] object-cover"
            />
            <div className='flex flex-row justify-between px-5'>
                <div className='flex flex-row space-x-5'>
                    <HeartIcon className='smallIcon' />
                    <ChatBubbleOvalLeftIcon
                        className='smallIcon' />
                </div>
                <BookmarkIcon
                    className='smallIcon' />
            </div>
        </div>
    )
}

export default Post