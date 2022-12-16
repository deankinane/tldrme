import React from 'react'

import EditText from '../edit-text/edit-text'

interface Props extends React.HTMLAttributes<HTMLElement> {
	text: string
	onTextChanged: (text: string) => void
	onBlur: () => void
}
export default function SectionTitle({
	text,
	onTextChanged,
	onBlur,
	...props
}: Props) {
	return (
		<EditText
			fontStyles="text-lg lg:text-2xl font-medium text-indigo-800 p-2"
			text={text}
			onTextChanged={onTextChanged}
			onBlur={onBlur}
			{...props}
		/>
	)
}
