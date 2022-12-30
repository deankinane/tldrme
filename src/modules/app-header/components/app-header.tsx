import { UserWidget } from '@/modules/common/user-widget/user-widget'
import { Bars3Icon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

interface Props {
	onMenuButtonClicked: () => void
}
export default function AppHeader({ onMenuButtonClicked }: Props) {
	return (
		<div className="h-16 bg-[#00000077] shadow-lg xl:hidden">
			<div className="mx-auto flex h-full max-w-screen-2xl items-center">
				<Bars3Icon
					className="ml-4 h-6 w-6 text-white xl:hidden"
					onClick={onMenuButtonClicked}
				></Bars3Icon>
				<Link href="/" className="grow">
					<p className="ml-4 text-xl font-bold text-white">tldrMe</p>
				</Link>
			</div>
		</div>
	)
}
