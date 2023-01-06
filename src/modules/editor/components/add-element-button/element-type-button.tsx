import React from 'react'
import { HTMLMotionProps, motion as m } from 'framer-motion'

interface Props extends HTMLMotionProps<'button'> {
	idx: number
}
export default function ElementTypeButton({ idx, ...props }: Props) {
	return (
		<m.button
			layout
			initial={{ x: -300, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -300, opacity: 0 }}
			transition={{ type: 'easeIn', duration: 0.25, delay: idx * 0.05 }}
			className="my-1 mr-2 min-w-fit rounded-lg bg-indigo-300 px-2 py-1 font-medium text-indigo-900 transition-colors hover:bg-indigo-400"
			{...props}
		>
			{props.children}
		</m.button>
	)
}
