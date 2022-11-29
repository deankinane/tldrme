import React, { useCallback, useState } from 'react'

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

	const validSource = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			const source = parseInt(ev.dataTransfer.getData('sourceColumn'))
			const itemIndex = parseInt(ev.dataTransfer.getData('itemIndex'))
			return (
				source === columnIndex &&
				(index < itemIndex || Math.abs(itemIndex - index) > 1)
			)
		},
		[columnIndex, index]
	)

	const onDrop = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			ev.preventDefault()
			onItemDropped(ev.dataTransfer.getData('itemId'), index)
			setDragHover(false)
		},
		[index, onItemDropped]
	)

	const onDragOver = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			if (validSource(ev)) {
				ev.preventDefault()
			}
		},
		[validSource]
	)

	const onDragEnter = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			if (validSource(ev)) {
				setDragHover(true)
			}
		},
		[validSource]
	)

	const onDragLeave = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			if (validSource(ev)) {
				setDragHover(false)
			}
		},
		[validSource]
	)

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
