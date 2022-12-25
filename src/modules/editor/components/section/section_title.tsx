import React from 'react'

import EditText from '../edit-text/edit-text'
import { FgColors } from '../sidebar/components/color-picker/color-picker'

interface Props extends React.HTMLAttributes<HTMLElement> {
	text: string
	textColor: number
	onTextChanged: (text: string) => void
	onBlur: () => void
}
export default function SectionTitle({
	text,
	onTextChanged,
	textColor,
	onBlur,
	...props
}: Props) {
	return (
		<EditText
			fontStyles={`${FgColors[textColor]} text-lg lg:text-2xl font-medium text-indigo-800 p-2`}
			text={text}
			onTextChanged={onTextChanged}
			onBlur={onBlur}
			{...props}
		/>
	)
}
