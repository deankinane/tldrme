import { trpc } from '@/utils/trpc'
import type { Element } from '@prisma/client'
import React, { useCallback } from 'react'
import SubTitleElement from './subtitle-element/subtitle-element'
interface Props {
	element: Element
	onElementUpdated: (element: Element) => void
	onDragStart: () => void
	onDragEnd: () => void
}
export default function BaseElement({
	element,
	onElementUpdated,
	onDragStart,
	onDragEnd,
}: Props) {
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

	if (element.type === 'SubTitle')
		return (
			<SubTitleElement
				element={element}
				onElementUpdated={updateElement}
			/>
		)
	else return <></>
}
