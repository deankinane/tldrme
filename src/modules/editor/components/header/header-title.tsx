import EditText from '@/modules/editor/components/edit-text/edit-text'
import { trpc } from '@/utils/trpc'
import React, { useState, useCallback } from 'react'

interface Props {
	resumeId: string
	title: string
	subTitle: string
}

export default function HeaderTitle({
	resumeId,
	title: pTitle,
	subTitle: pSubTitle,
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
				fontStyles="text-2xl font-normal p-2 md:text-3xl lg:font-light lg:text-5xl font-thin"
				onTextChanged={onTitleChanged}
				text={title}
			/>
			<EditText
				fontStyles="text-lg px-2 py-1 lg:text-2xl font-thin"
				onTextChanged={onSubTitleChanged}
				text={subTitle}
			/>
		</div>
	)
}
