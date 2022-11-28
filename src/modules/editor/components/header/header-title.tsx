import EditText from '@/modules/editor/components/edit-text/edit-text'
import React from 'react'

interface Props {
	fullName: string
	jobTitle: string
}

export default function HeaderTitle({ fullName, jobTitle }: Props) {
	return (
		<div className="flex h-full flex-col justify-center">
			<EditText
				fontStyles="text-4xl lg:text-5xl font-thin"
				onTextChanged={() => {
					return
				}}
				text={fullName}
			/>
			<EditText
				fontStyles="text-xl lg:text-2xl font-thin"
				onTextChanged={() => {
					return
				}}
				text={jobTitle}
			/>
		</div>
	)
}
