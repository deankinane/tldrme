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
				fontStyles="text-md lg:text-xl p-2 mt-2 font-semibold"
				onTextChanged={onTextChanged}
				text={element.text}
			/>
		</div>
	)
}
