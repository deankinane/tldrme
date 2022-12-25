import EditText from '@/modules/editor/components/edit-text/edit-text'
import { trpc } from '@/utils/trpc'
import React, { useState, useCallback } from 'react'
import { FgColors } from '../sidebar/components/color-picker/color-picker'

interface Props {
	resumeId: string
	title: string
	titleColor: number
	subTitle: string
	subTitleColor: number
}

export default function HeaderTitle({
	resumeId,
	title: pTitle,
	titleColor,
	subTitle: pSubTitle,
	subTitleColor,
}: Props) {
	const [title, setTitle] = useState(pTitle)
	const [subTitle, setSubTitle] = useState(pSubTitle)

	const mResumeTitle = trpc.editor.updateResumeTitle.useMutation()

	// Mutations
	const saveHeader = useCallback(
		(title: string, subTitle: string) => {
			mResumeTitle.mutate({
				resumeId: resumeId,
				title: title,
				subTitle: subTitle,
			})
		},
		[mResumeTitle, resumeId]
	)
	// End Mutations

	const onTitleChanged = useCallback(
		(text: string) => {
			setTitle(text)
			saveHeader(text, subTitle)
		},
		[saveHeader, subTitle]
	)

	const onSubTitleChanged = useCallback(
		(text: string) => {
			setSubTitle(text)
			saveHeader(title, text)
		},
		[saveHeader, title]
	)

	return (
		<div className="flex h-full flex-col justify-center">
			<EditText
				fontStyles={`${FgColors[titleColor]} text-xl font-normal pt-1 pb-3 px-2 md:text-3xl lg:font-light lg:text-5xl font-thin`}
				onTextChanged={onTitleChanged}
				text={title}
			/>
			<EditText
				fontStyles={`${FgColors[subTitleColor]} text-md px-2 py-1 lg:text-2xl font-thin`}
				onTextChanged={onSubTitleChanged}
				text={subTitle}
			/>
		</div>
	)
}
