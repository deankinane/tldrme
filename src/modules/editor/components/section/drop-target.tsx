import React, { useCallback, useState } from 'react'

interface Props {
	index: number
	onItemDropped: (index: number) => void
}
export default function DropTarget({ index, onItemDropped }: Props) {
	const [dragHover, setDragHover] = useState(false)

	const onDrop = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			ev.preventDefault()
			onItemDropped(index)
			setDragHover(false)
		},
		[index, onItemDropped]
	)

	const onDragOver = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
		ev.preventDefault()
	}, [])

	return (
		<div
			onDragEnter={() => setDragHover(true)}
			onDragLeave={() => setDragHover(false)}
			onDrop={onDrop}
			onDragOver={onDragOver}
			className={`h-8 bg-green-300 opacity-0 transition-all ${
				dragHover ? 'h-16 opacity-100' : ''
			}`}
		></div>
	)
}
