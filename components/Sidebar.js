import React, { useState } from 'react'
import SidebarLink from './SidebarLink'
import { BellIcon, UserCircleIcon, ChatBubbleLeftEllipsisIcon, BookmarkIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline'
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
        console.log(window.tronLink);

        let tronWeb;
        if (window.tronLink.ready) {
            tronWeb = window.tronLink.tronWeb;
            const address = tronWeb.defaultAddress.base58;
            console.log(address);
            setAddress(address);
        } else {
            const res = await window.tronLink.request({ method: 'tron_requestAccounts' });
            console.log(res);
            if (res.code === 200) {
                tronWeb = tronLink.tronWeb;
            }
        }
    }

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
                    <div>
                        <button data-popover-target="popover-bottom" data-popover-placement="bottom" type="button" class="text-white mb-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {formatAddress(address)}
                        </button>
                        <div data-popover id="popover-bottom" role="tooltip" class="inline-block absolute invisible z-10 w-64 text-sm font-light text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 transition-opacity duration-300 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                            <div class="py-2 px-3 bg-gray-100 rounded-t-lg border-b border-gray-200 dark:border-gray-600 dark:bg-gray-700">
                                <h3 class="font-semibold text-gray-900 dark:text-white">Popover bottom</h3>
                            </div>
                            <div class="py-2 px-3">
                                <p>And here's some amazing content. It's very engaging. Right?</p>
                            </div>
                            <div data-popper-arrow></div>
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