import { UserWidget } from '@/modules/common/user-widget/user-widget'
import Link from 'next/link'
import React from 'react'

export default function AppHeader() {
	return <div className="fixed h-16 w-full bg-[#00000077] shadow-md z-50 ">
		<div className='max-w-screen-2xl mx-auto flex items-center h-full'>
			<Link href='/' className='grow'>
				<p className='font-bold text-xl text-white ml-4'>tldrMe</p>
			</Link>
			<UserWidget className='mr-2' />
		</div>
	</div>
}
