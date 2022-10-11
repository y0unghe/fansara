import React from 'react'
import SidebarLink from './SidebarLink'
import { BellIcon, UserCircleIcon, ChatBubbleLeftEllipsisIcon, BookmarkIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline'

function Sidebar() {
    return (
        <div className=' border-r-gray-200 border-r-[1px] fixed h-full flex flex-col items-start w-[340px] p-2 gap-4'>
            {/* User profile picture */}
            <UserCircleIcon className='h-10 ml-[6px] mt-2 hover:border-2 hover:border-blue-500 hover:rounded-full cursor-pointer' />
            <SidebarLink Icon={HomeIcon} text="Home" active />
            <SidebarLink Icon={BellIcon} text="Notification Settings" />
            <SidebarLink Icon={ChatBubbleLeftEllipsisIcon} text="Messages" />
            <SidebarLink Icon={BookmarkIcon} text="Bookmarks" />
            <SidebarLink Icon={UserGroupIcon} text="Subscriptions" />
            <SidebarLink Icon={UserCircleIcon} text="My Profile" />
            <button className='hover:bg-blue-600 mx-auto w-[300px] bg-blue-500 text-white py-3 rounded-full'>Create Post</button>
        </div>
    )
}

export default Sidebar