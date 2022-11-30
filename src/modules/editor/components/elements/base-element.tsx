import { trpc } from '@/utils/trpc'
import type { Element } from '@prisma/client'
import React, { useCallback } from 'react'
import SubTitleElement from './subtitle-element/subtitle-element'
interface Props {
	element: Element
	onElementUpdated: (element: Element) => void
}
export default function BaseElement({ element, onElementUpdated }: Props) {
	const mUpdateElement = trpc.editor.updateElement.useMutation()

	const updateElement = useCallback(
		(el: Element) => {
			mUpdateElement.mutate({
				elementId: el.id,
				text: el.text,
			})

			onElementUpdated(el)
		},
		[mUpdateElement, onElementUpdated]
	)

	// const dragStart = useCallback((ev: React.DragEvent<HTMLDivElement>) => {},
	// [])

	return (
		<div draggable>
			{element.type === 'SubTitle' ? (
				<SubTitleElement
					element={element}
					onElementUpdated={updateElement}
				/>
			) : (
				<></>
			)}
		</div>
	)
}
