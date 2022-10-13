import React from 'react'
import SidebarLink from './SidebarLink'
import { BellIcon, UserCircleIcon, ChatBubbleLeftEllipsisIcon, BookmarkIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import Image from 'next/image';

function Sidebar() {
    const { data: session } = useSession();

    return (
        <div className='fixed h-full flex flex-col items-start w-[340px] p-2 gap-4'>
            <div className='ml-[10px] mt-[20px] cursor-pointer'>
                <Image
                    className='rounded-full cursor-pointer'
                    height={40}
                    width={40}
                    src={session.user.image}
                    alt={session.user.name}
                    objectFit="cover" />
            </div>
            <SidebarLink Icon={HomeIcon} text="Home" active />
            <SidebarLink Icon={BellIcon} text="Notification Settings" />
            <SidebarLink Icon={ChatBubbleLeftEllipsisIcon} text="Messages" />
            <SidebarLink Icon={BookmarkIcon} text="Bookmarks" />
            <SidebarLink Icon={UserGroupIcon} text="Subscriptions" />
            <SidebarLink Icon={UserCircleIcon} text="My Profile" />
            <button className='hover:bg-blue-600 mx-auto w-[300px] bg-blue-500 text-white py-3 rounded-full'>Post</button>
        </div>
    )
}

export default Sidebar