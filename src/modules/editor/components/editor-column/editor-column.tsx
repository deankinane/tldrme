import React, { useCallback, useRef, useState } from 'react'
import AddSectionButton from '@/modules/editor/components/add-section-button/add_section_button'
import Section from '@/modules/editor/components/section/section'
import DropTarget from '@/modules/editor/components/section/drop-target'
import { type SectionModel } from '@/utils/common/types'
import reorderSections from '../../utils/reorder-sections'
import { trpc } from '@/utils/trpc'
import { v4 as uuid } from 'uuid'
import TrashDropTarget from '../trash-drop-target/trash-drop-target'

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

	const [showTrashTarget, setShowTrashTarget] = useState(false)
	const newQueue = useRef<string[]>([])

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
	const mRemoveSection = trpc.editor.removeSection.useMutation()

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

	const onUpdateSection = useCallback((s: SectionModel) => {
		setSections((secs) => {
			const idx = secs.findIndex((x) => x.id === s.id)
			secs.splice(idx, 1, { ...s })
			return [...secs]
		})
		return
	}, [])

	const onDragStart = useCallback(() => {
		setShowTrashTarget(true)
	}, [])

	const onDragEnd = useCallback(() => {
		setShowTrashTarget(false)
	}, [])

	const onItemDropped = useCallback(
		(itemId: string, droppedIndex: number) => {
			const draggedItemIndex = sections.findIndex((x) => x.id == itemId)
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
		[mReorderSections, sections]
	)

	const onTrashDropped = useCallback(
		(itemId: string) => {
			setSections((secs) => {
				return secs.filter((s) => s.id !== itemId)
			})

			mRemoveSection.mutate({
				sectionId: itemId,
			})
			setShowTrashTarget(false)
		},
		[mRemoveSection]
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
						onDragEnd={onDragEnd}
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
			<TrashDropTarget
				onItemDropped={onTrashDropped}
				show={showTrashTarget}
			/>
		</div>
	)
}
