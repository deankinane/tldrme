import { UserIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import React from 'react'

export const UserWidget = ({ ...props }: React.ComponentProps<'div'>) => {
	const { data: session, status } = useSession()

	return status === 'authenticated' ? (
		<div
			{...props}
			className={`${props.className} mb-4
			flex items-center rounded-3xl bg-indigo-600 p-1 pr-3 text-sm font-thin text-white shadow-sm`}
		>
			<div className="rounded-full bg-indigo-900 p-2">
				<UserIcon className="w-4" />
			</div>
			<p className="grow pl-4">{session.user?.email}</p>
		</div>
	) : (
		<></>
	)
}
