import React from 'react'

function SidebarLink({ Icon, text, active }) {
    return (
        <div className={`text-lg flex gap-4 items-center cursor-pointer hoverAnimation ${active ? "font-bold text-black" : "text-normal text-gray-500"}`}>
            <Icon className={`h-7`} />
            <span className=''>{text}</span>
        </div>
    )
}

export default SidebarLink