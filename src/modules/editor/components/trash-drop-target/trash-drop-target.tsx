import React, { useCallback, useContext, useState } from 'react'
import { DraggableContext } from '../../utils/draggableContext'

interface Props {
	show: boolean
	onItemDropped: (itemId: string) => void
}
export default function TrashDropTarget({ show, onItemDropped }: Props) {
	const [dragHover, setDragHover] = useState(false)
	const { dragData, setDragData } = useContext(DraggableContext)

	const onDrop = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			ev.preventDefault()
			onItemDropped(dragData.itemId)
		},
		[dragData.itemId, onItemDropped]
	)

	const onDragOver = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
		ev.preventDefault()
	}, [])

	const onDragEnter = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
		setDragHover(true)
	}, [])

	const onDragLeave = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
		setDragHover(false)
	}, [])

	return (
		<div
			onDragEnter={onDragEnter}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			onDragOver={onDragOver}
			className={`${show ? '!h-16 opacity-100' : ''} ${
				dragHover ? 'bg-red-300' : ''
			} fixed bottom-8 left-[calc(50%-4.5rem)] my-0 mx-auto mt-40 h-0 w-36 overflow-hidden rounded-md border border-red-700 opacity-0 transition-all`}
		></div>
	)
}
