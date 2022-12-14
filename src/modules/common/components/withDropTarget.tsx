import React, { useCallback, useState } from 'react'
import { motion as m } from 'framer-motion'

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
			<m.div
				layout
				initial={{ height: 0, opacity: 0 }}
				animate={{
					opacity: 1,
					height: 'auto',
					transition: {
						ease: 'easeIn',
						height: { duration: 0.5 },
						opacity: { delay: 0.5, duration: 0.25 },
					},
				}}
				exit={{
					opacity: 0,
					height: 0,
					transition: {
						ease: 'easeOut',
						height: { delay: 0.25, duration: 0.5 },
						opacity: { duration: 0.25 },
					},
				}}
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				onDrop={onDrop}
				onDragOver={onDragOver}
				className="el"
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
			</m.div>
		)
	}
