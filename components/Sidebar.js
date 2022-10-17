import React, { useCallback, useEffect, useState } from 'react'
import SidebarLink from './SidebarLink'
import { UserCircleIcon, BookmarkIcon, HomeIcon, UserGroupIcon, ClipboardDocumentIcon, CreditCardIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import PopoverExample from './Popover';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function Sidebar() {
    const router = useRouter();
    const { data: session } = useSession();
    const [address, setAddress] = useState(null);
    const [node, setNode] = useState(null);
    const [account, setAccount] = useState(null);

    const formatAddress = (address) => {
        return `${address.substring(0, 7)}...${address.substring(
            address.length - 7
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

                const message = "Sign in from Fansara";
                const signedMessage = await tronWeb.trx.sign(message);

                await updateDoc(doc(db, 'users', session.user.uid), {
                    address: tronWeb.defaultAddress.base58
                });
            }
        }
        const address = tronWeb.defaultAddress.base58;
        setAddress(address);
        const host = tronWeb.solidityNode.host;
        setNode(host);
    }

    useEffect(() => {
        if (window.tronLink.ready && !address) {
            // console.log(window.tronLink);
            const tronWeb = window.tronLink.tronWeb;
            const address = tronWeb.defaultAddress.base58;
            setAddress(address);
            const host = tronWeb.solidityNode.host;
            setNode(host);
        }
    }, [address])

    const getAccount = async () => {
        if (!address) {
            return;
        }
        const account = await tronWeb.trx.getAccount(address);
        // console.log(account);
        setAccount(account);
    }

    useEffect(() => {
        getAccount();
    }, [address])

    const handleNodeChange = useCallback(res => {
        // if (res.data.message && res.data.message.action == "setAccount") {
        //     if (window.tronWeb) {
        //         if (res.data.message.data.address != this.defaultAccount) {
        //             window.location.reload();
        //         }
        //     } else {
        //         window.location.reload();
        //     }
        // }
        if (res.data.message && res.data.message.action == "setNode") {
            window.location.reload();
        }
    })

    useEffect(() => {
        window.addEventListener('message', handleNodeChange);
        return () => {
            window.removeEventListener('message', handleNodeChange);
        }
    }, [handleNodeChange])

    return (
        <div className='fixed h-full flex flex-col items-start w-[300px] p-2 gap-4'>
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
                    node && (
                        node === 'https://api.shasta.trongrid.io' ? (
                            <div className='group'>
                                <div
                                    className={`text-lg flex gap-4 items-center cursor-pointer hoverAnimation text-normal text-gray-500`}>
                                    <img src="/trx-icon.svg" className='h-7' />
                                    <span className=''>{formatAddress(address)}</span>
                                </div>
                                <div className='group-hover:opacity-100 transition-opacity opacity-0 mt-3'>
                                    <div className='flex flex-col space-y-5 bg-white  p-5 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                                        <div className='flex space-x-2 cursor-pointer hover:text-blue-500'>
                                            <ClipboardDocumentIcon className='text-gray-500 w-5' />
                                            <span className='  text-sm'>{formatAddress(address)}</span>
                                        </div>
                                        <div className='flex space-x-2'>
                                            <CreditCardIcon className='w-5 text-gray-500' />
                                            <span className='text-sm'>{account ? (account.balance / 1000000) : 0} TRX</span>
                                        </div>
                                        <div className='border-b-[1px] w-full'></div>
                                        <button
                                            className='bg-[#C23631] text-white h-[40px] rounded-full w-full hover:bg-[#A23631]'>Disconnect</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='flex space-x-2 ml-[10px] items-center'>
                                <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                                    <p class="font-bold">Incorrect Network</p>
                                    <p>Please switch to Shasta testnet.</p>
                                </div>
                            </div>
                        )
                    )
                    :
                    <div
                        onClick={connectToWallet}
                        className={`text-lg flex gap-4 items-center cursor-pointer hoverAnimation text-normal text-[#C23631]`}>
                        <img src="/trx-icon.svg" className='h-7' />
                        <span className=''>Connect to Wallet</span>
                    </div>
            }
        </div>
    )
}

export default Sidebar