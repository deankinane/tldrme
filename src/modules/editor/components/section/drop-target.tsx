import React, { useCallback, useState } from 'react'

interface Props {
	index: number
	columnIndex: number
	onItemDropped: (index: number) => void
}
export default function DropTarget({
	index,
	columnIndex,
	onItemDropped,
}: Props) {
	const [dragHover, setDragHover] = useState(false)

	const validSource = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			return (
				ev.dataTransfer.getData('sourceColumn') ===
				columnIndex.toString()
			)
		},
		[columnIndex]
	)

	const onDrop = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			ev.preventDefault()
			onItemDropped(index)
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
			className={`h-8 bg-green-300 opacity-0 transition-all ${
				dragHover ? 'h-16 opacity-100' : ''
			}`}
		></div>
	)
}
