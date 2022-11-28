import type { ResumeModel, SectionModel } from '@/utils/common/types'
import React, { useCallback, useEffect, useState } from 'react'
import EditorColumn from './components/editor-column/editor-column'
import Header from './components/header/header'
import reorderSections from './utils/reorder-sections'

interface Props {
	resumeModel: ResumeModel
}
export default function Editor({ resumeModel }: Props) {
	const [resume, setResume] = useState<ResumeModel>(resumeModel)

	useEffect(() => {
		setResume(resumeModel)
	}, [resumeModel])

	const onAddSection = useCallback(
		(columnId: number) => {
			const r = { ...resume }
			r.sections.push({
				id: 'section' + r.sections.length,
				title: 'New Section',
				columnIndex: columnId,
				order: r.sections.length,
				resumeId: r.id,
				elements: [],
			})
			setResume(r)
		},
		[resume]
	)

	const onUpdateSection = useCallback((s: SectionModel) => {
		setResume((r) => {
			r.sections.splice(s.order, 1, s)
			return { ...r }
		})
	}, [])

	const onSectionDropped = useCallback(
		(
			columnId: number,
			draggedItemIndex: number,
			dropTargetIndex: number
		) => {
			setResume((r) => {
				const columnSections = reorderSections(
					r.sections.filter((s) => s.columnIndex === columnId),
					draggedItemIndex,
					dropTargetIndex
				)
				r.sections = [
					...r.sections.filter((s) => s.columnIndex !== columnId),
					...columnSections,
				]
				return { ...r }
			})
		},
		[]
	)

	return (
		<div className="min-h-full pl-16 pr-16 shadow-lg">
			<Header
				fullName="Dean Kinane"
				jobTitle="Full Stack Software Engineer"
				profilePicUrl="/headshot.jpg"
			/>
			<div className="flex flex-col lg:flex-row">
				<div className="w-full lg:w-96">
					<EditorColumn
						columnId={1}
						sections={resume.sections.filter(
							(s) => s.columnIndex === 1
						)}
						onAddSection={onAddSection}
						onUpdateSection={onUpdateSection}
						onSectionDropped={onSectionDropped}
						onRemoveSection={() => {
							return
						}}
					/>
				</div>
				<div className="w-full lg:w-auto lg:flex-grow lg:pl-16">
					<EditorColumn
						columnId={2}
						sections={resume.sections.filter(
							(s) => s.columnIndex === 2
						)}
						onAddSection={onAddSection}
						onUpdateSection={onUpdateSection}
						onSectionDropped={onSectionDropped}
						onRemoveSection={() => {
							return
						}}
					/>
				</div>
			</div>
		</div>
	)
}
