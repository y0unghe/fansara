import { Popover, Transition } from '@headlessui/react'
import { UserCircleIcon, Cog8ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'

export default function PopoverExample() {
    const { data: session } = useSession();

    return (
        <div className="fixed top-2 max-w-sm px-2">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button>
                            <img
                                className='rounded-full cursor-pointer h-10 w-10 ml-3 mt-5 hover:border-4 hover:border-blue-500'
                                src={session.user.image}
                                alt={session.user.name} />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-10 -translate-x-1/2 transform px-4 sm:px-0 w-[280px] ml-[140px] -mt-[50px]">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid gap-8 bg-white">
                                        <div className='flex flex-col my-5 space-y-4'>
                                            <div className='flex flex-col mx-5 space-y-2'>
                                                <img
                                                    className='rounded-full cursor-pointer h-10 w-10 hover:border-4 hover:border-blue-500'
                                                    src={session.user.image}
                                                    alt={session.user.name} />
                                                <div>
                                                    <h1 className='font-medium'>
                                                        {session.user.name}
                                                    </h1>
                                                    <span className='text-gray-400 text-sm'>
                                                        @{session.user.tag}
                                                    </span>
                                                </div>
                                                <div className='flex space-x-2 text-sm'>
                                                    <span>0 Fans</span>
                                                    <span>0 Following</span>
                                                </div>
                                            </div>
                                            <div className=' h-[1px] bg-gray-100'></div>
                                            <div className='flex space-x-2 px-5 cursor-pointer hover:text-blue-500 h-[30px] items-center rounded-full'>
                                                <UserCircleIcon className='w-5' />
                                                <span className='text-sm'>My profile</span>
                                            </div>
                                            <div className='flex space-x-2 px-5 cursor-pointer hover:text-blue-500 h-[30px] items-center rounded-full'>
                                                <Cog8ToothIcon className='w-5' />
                                                <span className='text-sm'>Settings</span>
                                            </div>
                                            <div className=' h-[1px] bg-gray-100'></div>
                                            <div className='flex space-x-2 px-5 cursor-pointer hover:text-blue-500 h-[30px] items-center rounded-full'>
                                                <ArrowLeftOnRectangleIcon className='w-5' />
                                                <span className='text-sm'>Log out</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}
