import React, { useCallback, useId, useRef, useState } from 'react'
import AddSectionButton from '@/modules/editor/components/add-section-button/add_section_button'
import Section from '@/modules/editor/components/section/section'
import DropTarget from '@/modules/editor/components/section/drop-target'
import { type SectionModel } from '@/utils/common/types'
import reorderSections from '../../utils/reorder-sections'
import { trpc } from '@/utils/trpc'
import { v4 as uuid } from 'uuid'

interface Props {
	resumeId: string
	columnIndex: number
	sections: SectionModel[]
}

export default function EditorColumn({
	resumeId,
	columnIndex,
	sections: pSections,
}: Props) {
	const [sections, setSections] = useState(pSections)
	const [draggedItemIndex, setDraggedItemIndex] = useState(-1)
	const newQueue = useRef<string[]>([])

	const mUpdateSectionTitle = trpc.editor.updateSectionTitle.useMutation()
	const mAddSection = trpc.editor.addSection.useMutation({
		onSuccess: (d) => {
			if (!d) return
			const mergeId =
				newQueue.current.length > 0
					? newQueue.current.splice(0, 1)[0]
					: undefined

			if (mergeId) {
				setSections((secs) => {
					secs.forEach((s) => (s.id = s.id === mergeId ? d.id : s.id))
					return [...secs]
				})
			}
		},
	})
	const mReorderSections = trpc.editor.reorderSection.useMutation()

	const onAddSectionClicked = useCallback(() => {
		const newSection: SectionModel = {
			resumeId,
			columnIndex,
			order: sections.length,
			title: 'New Section',
			elements: [],
			id: uuid(),
		}

		newQueue.current.push(newSection.id)

		setSections((s) => {
			return [...s, newSection]
		})

		mAddSection.mutate({
			resumeId,
			columnIndex,
			order: newSection.order,
		})
	}, [columnIndex, mAddSection, resumeId, sections.length])

	const onUpdateSection = useCallback(
		(s: SectionModel) => {
			setSections((secs) => {
				secs.splice(s.order, 1, s)
				return [...secs]
			})

			mUpdateSectionTitle.mutate({
				sectionId: s.id,
				title: s.title,
			})
			return
		},
		[mUpdateSectionTitle]
	)

	const onDragStart = useCallback((index: number) => {
		setDraggedItemIndex(index)
	}, [])

	const onItemDropped = useCallback(
		(droppedIndex: number) => {
			const newOrder = reorderSections(
				sections,
				draggedItemIndex,
				droppedIndex
			)
			setSections(newOrder)
			mReorderSections.mutate(
				newOrder.map((s) => {
					return { sectionId: s.id, newOrder: s.order }
				})
			)
		},
		[draggedItemIndex, mReorderSections, sections]
	)

	return (
		<div>
			{sections.map((s, i) => (
				<div key={s.id}>
					<DropTarget
						index={i}
						columnIndex={columnIndex}
						onItemDropped={onItemDropped}
					/>
					<Section
						index={i}
						model={s}
						onDragStart={onDragStart}
						onModelUpdated={onUpdateSection}
					></Section>
				</div>
			))}
			<DropTarget
				index={sections.length}
				columnIndex={columnIndex}
				onItemDropped={onItemDropped}
			/>
			<AddSectionButton onAddSectionClicked={onAddSectionClicked} />
		</div>
	)
}
