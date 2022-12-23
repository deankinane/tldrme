import { trpc } from '@/utils/trpc'
import React, { useCallback, useContext, useMemo } from 'react'
import { ResumeContext } from '../../utils/resumeContext'
import StyleItem from './components/style-item/style-item'

export const Sidebar = () => {
	const { resume, updateResume } = useContext(ResumeContext)
	const mUpdateStyles = trpc.editor.updateResumeStyle.useMutation()

	const styleElements = useMemo(
		() => [
			{
				label: 'Name',
				color: resume.resumeStyle.headerTitleColor,
				callback: (c: number) => {
					resume.resumeStyle.headerTitleColor = c
					updateResume(resume)
					mUpdateStyles.mutate({
						id: resume.resumeStyleId,
						headerTitleColor: c,
					})
				},
			},
			{
				label: 'Job Title',
				color: resume.resumeStyle.headerSubtitleColor,
				callback: (c: number) => {},
			},
		],
		[resume]
	)

	return (
		<div className="hidden h-full w-80 shrink-0 bg-[#00000077] xl:block">
			<div className="p-8 text-white">
				<p className="text-lg font-semibold">Resume Styles</p>
				<div className="my-4">
					{styleElements.map((s) => (
						<StyleItem
							key={s.label}
							onColorChanged={(c: number) => s.callback(c)}
							initialColor={s.color}
							label={s.label}
							className="mt-4"
						/>
					))}
				</div>
			</div>
		</div>
	)
}
