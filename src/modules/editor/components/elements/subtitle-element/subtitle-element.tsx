import type { Element } from '@prisma/client'
import { ElementType } from '@prisma/client'
import React, { useCallback } from 'react'
import EditText from '../../edit-text/edit-text'

interface Props {
	element: Element
	onElementUpdated: (element: Element) => void
}
export default function SubTitleElement({ element, onElementUpdated }: Props) {
	const onTextChanged = useCallback(
		(text: string) => {
			element.text = text
			onElementUpdated(element)
		},
		[element, onElementUpdated]
	)

	return (
		<div data-testid={`element-${ElementType.SubTitle}`}>
			<EditText
				fontStyles="tex-lg lg:text-xl px-2 pb-1 mb-4"
				onTextChanged={onTextChanged}
				text={element.text}
			/>
		</div>
	)
}
