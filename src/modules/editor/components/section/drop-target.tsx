import React, { useCallback, useContext, useState } from 'react'
import { DraggableContext, DraggableType } from '../../utils/draggableContext'

interface Props {
	index: number
	columnIndex: number
	onItemDropped: (itemId: string, index: number) => void
}
export default function DropTarget({
	index,
	columnIndex,
	onItemDropped,
}: Props) {
	const [dragHover, setDragHover] = useState(false)
	const { dragData, endDrag } = useContext(DraggableContext)

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

	const onDrop = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			ev.preventDefault()
			if (dragData.sectionId) onItemDropped(dragData.sectionId, index)
			setDragHover(false)
			endDrag()
		},
		[dragData.sectionId, endDrag, index, onItemDropped]
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
