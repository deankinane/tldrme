import {
	ArrowLeftOnRectangleIcon,
	UserIcon,
	XCircleIcon,
	XMarkIcon,
} from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

export const UserWidget = (props: React.ComponentProps<'div'>) => {
	const { data: session, status } = useSession()
	const [open, setOpen] = useState(false)

	return status === 'authenticated' ? (
		<div
			{...props}
			className={`${props.className} flex items-center rounded-3xl bg-[#100F26] p-2 text-sm font-thin text-white`}
		>
			<div className="rounded-full" onClick={() => setOpen(true)}>
				<UserIcon className="w-5" />
			</div>
			{open ? (
				<div className="absolute -right-2 top-10 z-50 flex items-center rounded-md bg-[#100F26] p-2 pl-4 shadow-lg">
					<p className="grow">{session.user?.email}</p>
					<div className="ml-4 rounded-full bg-indigo-600 p-2">
						<ArrowLeftOnRectangleIcon className="w-5" />
					</div>
					<div
						className="ml-2 rounded-full bg-indigo-600 p-2"
						onClick={() => setOpen(false)}
					>
						<XMarkIcon className="w-5" />
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	) : (
		<></>
	)
}
