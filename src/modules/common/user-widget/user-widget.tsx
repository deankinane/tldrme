import { UserIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import React from 'react'

export const UserWidget = (props: React.ComponentProps<'div'>) => {
    const { data: session, status } = useSession()

    return (
        status === 'authenticated' ?
            <div {...props} className={`${props.className} flex items-center p-2 bg-indigo-700 text-sm rounded-3xl text-white font-thin`}>
                <div className='rounded-full p-1 bg-indigo-400 mr-4'>
                    <UserIcon className='w-4' />
                </div>
                <p className='mr-2'>
                    {session.user?.email}
                </p>
            </div>
            : <></>
    )
}
