import { useRouter } from 'next/router'
import React from 'react'

function UserPage() {
    const router = useRouter();
    const { tag } = router.query;

    return (
        <div>UserPage</div>
    )
}

export default UserPage