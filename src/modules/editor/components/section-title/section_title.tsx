import React from 'react'
import EditText from '../edit-text/edit-text'

interface Props extends React.HTMLAttributes<HTMLElement> {
	text: string
	onTextChanged: (text: string) => void
}
export default function SectionTitle({ text, onTextChanged, ...props }: Props) {
	return (
		<EditText
			fontStyles="text-xl lg:text-3xl font-medium text-purple-800 p-2"
			text={text}
			onTextChanged={onTextChanged}
			{...props}
		/>
	)
}
