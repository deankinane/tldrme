import React from 'react'

export default function ActionButton({
	...props
}: React.ComponentProps<'button'>) {
	return (
		<button
			className="mb-2 h-8 w-8 rounded-full bg-purple-900 p-2 text-white"
			{...props}
		>
			{props.children}
		</button>
	)
}
