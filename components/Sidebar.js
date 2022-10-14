import React from 'react'
import SidebarLink from './SidebarLink'
import { BellIcon, UserCircleIcon, ChatBubbleLeftEllipsisIcon, BookmarkIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react";

function Sidebar() {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className='fixed h-full flex flex-col items-start w-[350px] p-2 gap-4'>
            <img
                onClick={() => {
                    // signOut()
                    // router.push('/');
                    router.push('/settings/profile')
                }}
                className='rounded-full cursor-pointer h-10 w-10 ml-3 mt-5 hover:border-4 hover:border-blue-500'
                src={session.user.image}
                alt={session.user.name} />
            <SidebarLink
                Icon={HomeIcon}
                text="Home"
                active={router.pathname === "/"}
                onClick={() => router.push("/")} />
            <SidebarLink
                Icon={BellIcon}
                text="Notifications"
                onClick={() => router.push("/notifications")}
            />
            <SidebarLink Icon={ChatBubbleLeftEllipsisIcon} text="Messages" />
            <SidebarLink
                active={router.pathname === '/bookmarks'}
                onClick={() => router.push("/bookmarks")}
                Icon={BookmarkIcon}
                text="Bookmarks" />
            <SidebarLink Icon={UserGroupIcon} text="Subscriptions" />
            <SidebarLink Icon={UserCircleIcon} text="My Profile" />
            <button className='hover:bg-blue-600 w-[250px] ml-3 bg-blue-500 text-white py-3 rounded-full'>Post</button>
        </div>
    )
}

export default Sidebar