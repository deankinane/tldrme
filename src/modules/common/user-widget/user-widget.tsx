import { useSession } from 'next-auth/react'
import React from 'react'

export const UserWidget = (props: {}) => {
    const { data: session, status } = useSession()

    return (
        status === 'authenticated' ?
            <div>

            </div>
            : <></>
    )
}
