import { UserWidget } from '@/modules/common/user-widget/user-widget'
import { trpc } from '@/utils/trpc'
import { ResumeStyle } from '@prisma/client'
import Link from 'next/link'
import React, { useCallback, useContext, useMemo } from 'react'
import { ResumeContext } from '../../utils/resumeContext'
import SlugEditor from './components/slug-editor/slug-editor'
import StyleItem from './components/style-item/style-item'

interface Props {
	showSideMenu: boolean
	closeSideMenu: () => void
}
export const Sidebar = ({ showSideMenu, closeSideMenu }: Props) => {
	const { resume, updateResume } = useContext(ResumeContext)
	const mUpdateStyles = trpc.editor.updateResumeStyle.useMutation()

	const closeSideBar = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault()
			if (e.target === e.currentTarget) {
				closeSideMenu()
			}
		},
		[closeSideMenu]
	)

	const updateStyles = useCallback((styles: ResumeStyle) => {
		mUpdateStyles.mutate({
			id: resume.resumeStyleId,
			headerTitleColor: styles.headerTitleColor,
			headerSubtitleColor: styles.headerSubtitleColor,
			sectionTitleColor: styles.sectionTitleColor,
			sectionSubtitleColor: styles.sectionSubtitleColor,
			infoTextColor: styles.infoTextColor,
			elementTextColor: styles.elementTextColor,
			bulletColor: styles.bulletColor,
			iconColor: styles.iconColor,
		})
	}, [])

	const styleElements = useMemo(
		() => [
			{
				label: 'Header Title',
				color: resume.resumeStyle.headerTitleColor,
				callback: (c: number) => {
					resume.resumeStyle.headerTitleColor = c
					updateResume(resume)
					updateStyles(resume.resumeStyle)
				},
			},
			{
				label: 'Header Subtitle',
				color: resume.resumeStyle.headerSubtitleColor,
				callback: (c: number) => {
					resume.resumeStyle.headerSubtitleColor = c
					updateResume(resume)
					updateStyles(resume.resumeStyle)
				},
			},
			{
				label: 'Section Titles',
				color: resume.resumeStyle.sectionTitleColor,
				callback: (c: number) => {
					resume.resumeStyle.sectionTitleColor = c
					updateResume(resume)
					updateStyles(resume.resumeStyle)
				},
			},
			{
				label: 'Section Subtitle',
				color: resume.resumeStyle.sectionSubtitleColor,
				callback: (c: number) => {
					resume.resumeStyle.sectionSubtitleColor = c
					updateResume(resume)
					updateStyles(resume.resumeStyle)
				},
			},
			{
				label: 'Info Text',
				color: resume.resumeStyle.infoTextColor,
				callback: (c: number) => {
					resume.resumeStyle.infoTextColor = c
					updateResume(resume)
					updateStyles(resume.resumeStyle)
				},
			},
			{
				label: 'Primary Text',
				color: resume.resumeStyle.elementTextColor,
				callback: (c: number) => {
					resume.resumeStyle.elementTextColor = c
					updateResume(resume)
					updateStyles(resume.resumeStyle)
				},
			},
			{
				label: 'Bullet Points',
				color: resume.resumeStyle.bulletColor,
				callback: (c: number) => {
					resume.resumeStyle.bulletColor = c
					updateResume(resume)
					updateStyles(resume.resumeStyle)
				},
			},
			{
				label: 'Icons',
				color: resume.resumeStyle.iconColor,
				callback: (c: number) => {
					resume.resumeStyle.iconColor = c
					updateResume(resume)
					updateStyles(resume.resumeStyle)
				},
			},
		],
		[resume, updateStyles]
	)

	return (
		<div
			className={`${
				showSideMenu ? 'block' : 'hidden'
			} fixed z-30 h-full w-full shrink-0 bg-[#00000099] xl:static xl:block xl:w-80 xl:bg-transparent`}
			onClick={closeSideBar}
		>
			<div className="h-full w-80 bg-[#100F26] text-white shadow-lg xl:fixed xl:left-0">
				<div className="p-8">
					<Link href="/" className="hidden xl:block">
						<p className="mb-8 text-2xl font-bold text-white">
							tldrMe
						</p>
					</Link>
					<UserWidget className="mb-8" />
					<p className="text-lg font-semibold">Resume Colours</p>
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
					<SlugEditor resume={resume} />
				</div>
			</div>
		</div>
	)
}
