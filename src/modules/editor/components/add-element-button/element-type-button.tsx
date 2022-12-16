import type { ComponentProps } from 'react'
import React from 'react'

export default function ElementTypeButton({
	...props
}: ComponentProps<'button'>) {
	return (
		<button
			className="my-1 mr-2 min-w-fit rounded-lg bg-indigo-300 px-2 py-1 font-medium text-indigo-900 transition-colors hover:bg-indigo-400"
			{...props}
		>
			{props.children}
		</button>
	)
}
