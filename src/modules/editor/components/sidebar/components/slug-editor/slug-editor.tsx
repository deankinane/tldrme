import { ResumeModel } from '@/utils/common/types'
import { trpc } from '@/utils/trpc'
import React, { useCallback, useState } from 'react'
import EditText from '../../../edit-text/edit-text'

interface Props extends React.ComponentProps<'div'> {
	resume: ResumeModel
}

export default function SlugEditor({ resume }: Props) {
	const mUpdateSlug = trpc.editor.updateResumeSlug.useMutation({
		onError: () => {
			setError(true)
		},
	})
	const [error, setError] = useState(false)
	const [slug, setSlug] = useState(resume.urlSlug || '')

	const onSlugChanged = useCallback(
		(newSlug: string) => {
			mUpdateSlug.mutate({
				id: resume.id,
				slug: newSlug,
			})
			setSlug(newSlug)
			setError(false)
		},
		[resume.id]
	)

	return (
		<div>
			<p className="mb-2 font-bold">Customise your URL</p>
			<div className="flex items-center rounded-md bg-indigo-900 p-2 text-sm">
				<p>tldrme.gg/view/</p>
				<EditText
					fontStyles={`text-sm bg-white ${
						error ? 'text-red-600' : 'text-black'
					}`}
					className="grow"
					onTextChanged={onSlugChanged}
					text={slug}
				></EditText>
			</div>
			{error ? (
				<p className="mt-1 text-[0.7rem] text-red-400">
					That url is already in use or not valid. Please choose
					another
				</p>
			) : (
				<></>
			)}
		</div>
	)
}
