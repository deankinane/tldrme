import React, { useCallback, useContext, useEffect, useState } from 'react'
import AddSectionButton from '@/modules/editor/components/add-section-button/add_section_button'
import Section from '@/modules/editor/components/section/section'
import { type SectionModel } from '@/utils/common/types'
import { trpc } from '@/utils/trpc'
import { ResumeContext } from '../../utils/resumeContext'
import { DraggableContext, DraggableType } from '../../utils/draggableContext'
import reorderSections from '../../utils/reorder-sections'
import { AnimatePresence, LayoutGroup, motion as m } from 'framer-motion'

interface Props {
	columnIndex: number
}

export default function EditorColumn({ columnIndex }: Props) {
	const { resume, updateResume } = useContext(ResumeContext)
	const [sections, setSections] = useState<SectionModel[]>([])
	const { dragData } = useContext(DraggableContext)

	useEffect(() => {
		setSections(
			resume.sections.filter((s) => s.columnIndex === columnIndex)
		)
	}, [columnIndex, resume.sections])

	const mAddSection = trpc.editor.addSection.useMutation({
		onSuccess: (d) => {
			if (!d) return
			resume.sections = [...resume.sections, { ...d, elements: [] }]
			updateResume(resume)
		},
	})
	const mReorderSections = trpc.editor.reorderSection.useMutation()

	const onAddSectionClicked = useCallback(() => {
		let order = 0
		sections.forEach((s) => (order = s.order > order ? s.order : order))
		order++

		mAddSection.mutate({
			resumeId: resume.id,
			columnIndex,
			order: order,
		})
	}, [columnIndex, mAddSection, resume, sections])

	const onUpdateSection = useCallback((s: SectionModel) => {
		setSections((secs) => {
			const idx = secs.findIndex((x) => x.id === s.id)
			secs.splice(idx, 1, { ...s })
			return [...secs]
		})
		return
	}, [])

	const validSource = useCallback(
		(targetIndex: number) => {
			return (
				dragData.itemType === DraggableType.SECTION &&
				dragData.columnIndex === columnIndex &&
				(targetIndex > dragData.itemIndex ||
					Math.abs(dragData.itemIndex - targetIndex) > 1)
			)
		},
		[
			columnIndex,
			dragData.columnIndex,
			dragData.itemIndex,
			dragData.itemType,
		]
	)

	const onSectionDropped = useCallback(
		(droppedIndex: number) => {
			const columnSections = resume.sections.filter(
				(s) => s.columnIndex === columnIndex
			)
			const draggedItemIndex = columnSections.findIndex(
				(x) => x.id == dragData.sectionId
			)
			const newOrder = reorderSections(
				columnSections,
				draggedItemIndex,
				droppedIndex
			) as SectionModel[]

			resume.sections = [
				...resume.sections.filter((s) => s.columnIndex !== columnIndex),
				...newOrder,
			]
			updateResume(resume)
			mReorderSections.mutate(
				newOrder.map((s) => {
					return { sectionId: s.id, newOrder: s.order }
				})
			)
		},

		[
			columnIndex,
			dragData.sectionId,
			mReorderSections,
			resume,
			updateResume,
		]
	)

	return (
		<div>
			<LayoutGroup>
				<AnimatePresence>
					{sections
						.sort((a, b) => a.order - b.order)
						.map((s, i) => (
							<Section
								key={s.id}
								index={i}
								model={s}
								onModelUpdated={onUpdateSection}
								isValidSource={validSource}
								onItemDropped={onSectionDropped}
							></Section>
						))}
					<AddSectionButton
						onAddSectionClicked={onAddSectionClicked}
						isLoading={mAddSection.isLoading}
					/>
				</AnimatePresence>
			</LayoutGroup>
		</div>
	)
}
