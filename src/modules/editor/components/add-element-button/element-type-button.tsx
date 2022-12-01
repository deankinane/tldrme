import type { ComponentProps } from 'react'
import React from 'react'

export default function ElementTypeButton({
	...props
}: ComponentProps<'button'>) {
	return (
		<button
			className="my-1 mr-2 min-w-fit rounded-lg bg-purple-300 px-2 py-1 font-medium text-purple-900 transition-colors hover:bg-purple-400"
			{...props}
		>
			{props.children}
		</button>
	)
}
