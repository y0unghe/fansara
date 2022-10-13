import React from 'react'
import {
    MagnifyingGlassIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline'

function Widgets() {
    const search = async () => {

    }

    return (
        <div className='w-[350px] p-5 flex flex-col'>
            <div className='sticky top-0 z-50 flex border-2 border-gray-200 h-[40px] rounded-lg hover:border-blue-500'>
                <input
                    placeholder='Search'
                    className='w-full outline-none p-1 px-2 rounded-lg' />
                <MagnifyingGlassIcon
                    onClick={search}
                    className='w-5 text-gray-400 mr-2 cursor-pointer' />
            </div>
            <div className='flex flex-col mt-10'>
                <div className='flex flex-row justify-between'>
                    <span className='text-gray-400 text-sm'>Recommend</span>
                    <div className='flex space-x-5'>
                        <ArrowPathIcon className='w-5 cursor-pointer text-gray-500' />
                        <ChevronLeftIcon className='w-5 cursor-pointer' />
                        <ChevronRightIcon className='w-5 cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Widgets