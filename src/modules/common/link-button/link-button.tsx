import Link from 'next/link'
import React from 'react'
import { Button } from '../button/button'
interface Props extends React.ComponentProps<typeof Link> {
	href: string
}
export const LinkButton = (props: React.ComponentProps<typeof Link>) => {
	return (
		<Link
			{...props}
			className={`${props.className} rounded-md bg-indigo-600 py-4 px-8 font-semibold text-white shadow-2xl transition-colors duration-500 hover:bg-indigo-500`}
		>
			{props.children}
		</Link>
	)
}
