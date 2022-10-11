import React from 'react'
import Input from './Input'

function Feed() {
    return (
        <div className=' ml-[340px] max-w-2xl flex-grow border-l border-r border-gray-200 border-1'>
            <div className='text-black font-bold p-4 border-b border-1 border-gray-200 sticky'>
                Home
            </div>
            <Input />
        </div>
    )
}

export default Feed