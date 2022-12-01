import { ElementType } from '@prisma/client'
import React, { useCallback } from 'react'
import EditText from '../../edit-text/edit-text'
import type { ElementProps } from '../common/element-props'

export default function SubTitleElement({
	element,
	onElementUpdated,
}: ElementProps) {
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
				fontStyles="text-lg lg:text-xl px-2 pb-1 mb-2"
				onTextChanged={onTextChanged}
				text={element.text}
			/>
		</div>
	)
}
