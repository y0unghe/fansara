import React, { useEffect, useState } from 'react'
import SidebarLink from './SidebarLink'
import { UserCircleIcon, BookmarkIcon, HomeIcon, UserGroupIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import PopoverExample from './Popover';

function Sidebar() {
    const router = useRouter();
    const { data: session } = useSession();
    const [address, setAddress] = useState(null);

    const formatAddress = (address) => {
        return `${address.substring(0, 5)}...${address.substring(
            address.length - 5
        )}`;
    }

    const connectToWallet = async () => {
        let tronWeb;
        if (window.tronLink.ready) {
            tronWeb = window.tronLink.tronWeb;
        } else {
            const res = await window.tronLink.request({ method: 'tron_requestAccounts' });
            if (res.code === 200) {
                tronWeb = tronLink.tronWeb;
            }
        }
        const address = tronWeb.defaultAddress.base58;
        setAddress(address);
    }

    useEffect(() => {
        if (window.tronLink.ready) {
            const tronWeb = window.tronLink.tronWeb;
            const address = tronWeb.defaultAddress.base58;
            setAddress(address);
        }
    }, [])

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
            {
                address
                    ?
                    <div className='group'>
                        <span className='text-blue-500 cursor-pointer ml-[15px]'>
                            {formatAddress(address)}
                        </span>
                        <div className='group-hover:opacity-100 transition-opacity opacity-0'>
                            <div className='flex flex-col space-y-5 bg-gray-50 p-5 rounded-2xl drop-shadow-2xl'>
                                <div className='flex space-x-2'>
                                    <span className=' cursor-pointer hover:text-blue-500'>{address}</span>
                                    <ClipboardDocumentIcon className='text-gray-500 w-5' />
                                </div>
                                <span>{0} TRX</span>
                                <div className='border-[1px] text-gray-300 w-full'></div>
                                <button className='bg-blue-500 text-white h-[40px] rounded-full w-full'>Disconnect</button>
                            </div>
                        </div>
                    </div>
                    :
                    <button
                        onClick={connectToWallet}
                        className='hover:bg-blue-600 w-[250px] ml-3 bg-blue-500 text-white py-3 rounded-full'>
                        Connect to Wallet
                    </button>
            }
        </div>
    )
}

export default Sidebar