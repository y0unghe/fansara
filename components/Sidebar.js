import React from 'react'
import SidebarLink from './SidebarLink'
import { BellIcon, UserCircleIcon, ChatBubbleLeftEllipsisIcon, BookmarkIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import PopoverExample from './Popover';

function Sidebar() {
    const router = useRouter();
    const { data: session } = useSession();

    return (
        <div className='fixed h-full flex flex-col items-start w-[350px] p-2 gap-4'>
            <PopoverExample />
            <div className='mt-[60px]'></div>
            <SidebarLink
                Icon={HomeIcon}
                text="Home"
                active={router.pathname === "/"}
                onClick={() => router.push("/")} />
            {/* <SidebarLink
                Icon={BellIcon}
                text="Notifications"
                onClick={() => router.push("/notifications")}
            />
            <SidebarLink Icon={ChatBubbleLeftEllipsisIcon} text="Messages" /> */}
            <SidebarLink
                active={router.pathname === '/bookmarks'}
                onClick={() => router.push("/bookmarks")}
                Icon={BookmarkIcon}
                text="Bookmarks" />
            <SidebarLink Icon={UserGroupIcon} text="Subscriptions" />
            <SidebarLink
                onClick={() => router.push(`/${session.user.tag}`)}
                Icon={UserCircleIcon} text="My Profile" />
            {/* <button className='hover:bg-blue-600 w-[250px] ml-3 bg-blue-500 text-white py-3 rounded-full'>Post</button> */}
        </div>
    )
}

export default Sidebar