import { trpc } from '@/utils/trpc'
import React, { useCallback, useContext, useState } from 'react'
import { DraggableContext, DraggableType } from '../../utils/draggableContext'
import reorderSections from '../../utils/reorder-sections'
import { ResumeContext } from '../../utils/resumeContext'

interface Props {
	index: number
	columnIndex: number
}
export default function DropTarget({ index, columnIndex }: Props) {
	const [dragHover, setDragHover] = useState(false)
	const { dragData } = useContext(DraggableContext)
	const { resume, updateResume } = useContext(ResumeContext)

	const mReorderSections = trpc.editor.reorderSection.useMutation()

	const validSource = useCallback(() => {
		return (
			dragData.itemType === DraggableType.SECTION &&
			dragData.columnIndex === columnIndex &&
			(index < dragData.itemIndex ||
				Math.abs(dragData.itemIndex - index) > 1)
		)
	}, [
		columnIndex,
		dragData.columnIndex,
		dragData.itemIndex,
		dragData.itemType,
		index,
	])

	const onItemDropped = useCallback(
		(itemId: string, droppedIndex: number) => {
			const columnSections = resume.sections.filter(
				(s) => s.columnIndex === columnIndex
			)
			const draggedItemIndex = columnSections.findIndex(
				(x) => x.id == itemId
			)
			const newOrder = reorderSections(
				columnSections,
				draggedItemIndex,
				droppedIndex
			)
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

		[columnIndex, mReorderSections, resume, updateResume]
	)

	const onDrop = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			ev.preventDefault()
			if (dragData.sectionId) onItemDropped(dragData.sectionId, index)
			setDragHover(false)
		},
		[dragData.sectionId, index, onItemDropped]
	)

	const onDragOver = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			if (validSource()) {
				ev.preventDefault()
			}
		},
		[validSource]
	)

	const onDragEnter = useCallback(() => {
		if (validSource()) {
			setDragHover(true)
		}
	}, [validSource])

	const onDragLeave = useCallback(() => {
		if (validSource()) {
			setDragHover(false)
		}
	}, [validSource])

	return (
		<div
			onDragEnter={onDragEnter}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			onDragOver={onDragOver}
			className={`mx-2 h-8 bg-green-300 opacity-0 transition-all ${
				dragHover ? 'mb-4 h-16 opacity-100' : ''
			}`}
		></div>
	)
}
