import React, { useCallback, useState } from 'react'

interface WithDropTargetProps {
	isValidSource: (index: number) => boolean
	onItemDropped: (droppedIndex: number) => void
	index: number
}

export const withDropTarget = <P extends object>(
	Component: React.ComponentType<P>
): React.FC<P & WithDropTargetProps> =>
	function DropTarget({ isValidSource, onItemDropped, index, ...props }) {
		const [dragHover, setDragHover] = useState(0)

		const onDrop = useCallback(
			(ev: React.DragEvent<HTMLDivElement>) => {
				ev.preventDefault()
				setDragHover(0)
				onItemDropped(index)
			},
			[index, onItemDropped]
		)

		const onDragOver = useCallback(
			(ev: React.DragEvent<HTMLDivElement>) => {
				if (isValidSource(index)) {
					ev.preventDefault()
				}
			},
			[index, isValidSource]
		)

		const onDragEnter = useCallback(() => {
			if (isValidSource(index)) {
				setDragHover((d) => d + 1)
			}
		}, [index, isValidSource])

		const onDragLeave = useCallback(() => {
			if (isValidSource(index)) {
				setDragHover((d) => d - 1)
			}
		}, [index, isValidSource])

		return (
			<div
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				onDrop={onDrop}
				onDragOver={onDragOver}
			>
				<Component
					{...(props as P)}
					index={index}
					onDragEnter={onDragEnter}
					onDragLeave={onDragLeave}
				/>
				<div
					onDragEnter={onDragEnter}
					onDragLeave={onDragLeave}
					className={`h-0 bg-green-300 transition-all ${
						dragHover > 0 ? 'my-2 h-12' : ''
					}`}
				></div>
			</div>
		)
	}
