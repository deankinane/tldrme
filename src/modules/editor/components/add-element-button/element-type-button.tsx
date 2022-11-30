import type { PropsWithChildren } from 'react'
import React from 'react'
interface Props extends PropsWithChildren {
	onClick?: () => void
}
export default function ElementTypeButton({ onClick, children }: Props) {
	return (
		<button
			className="mt-1 mr-2 rounded-lg bg-purple-300 px-2 py-1 text-purple-900 transition-colors hover:bg-purple-400"
			onClick={onClick}
		>
			{children}
		</button>
	)
}
