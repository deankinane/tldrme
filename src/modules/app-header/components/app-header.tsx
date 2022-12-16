import { UserWidget } from '@/modules/common/user-widget/user-widget'
import Link from 'next/link'
import React from 'react'

export default function AppHeader() {
	return <div className="fixed h-16 w-full flex items-center bg-[#00000077]">
		<Link href='/' className='grow'>
			<p className='font-bold text-xl text-white ml-4'>tldrMe</p>
		</Link>
		<UserWidget className='mr-2' />
	</div>
}
