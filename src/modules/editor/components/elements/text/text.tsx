import { ElementType } from '@prisma/client'
import React, { useCallback } from 'react'
import EditText from '../../edit-text/edit-text'
import { FgColors } from '../../sidebar/components/color-picker/color-picker'
import type { ElementProps } from '../common/element-props'

export default function TextElement({
	element,
	onElementUpdated,
	styles,
	onBlur,
}: ElementProps) {
	const onTextChanged = useCallback(
		(text: string) => {
			if (element.text === text) return
			element.text = text
			onElementUpdated(element)
		},
		[element, onElementUpdated]
	)

	return (
		<div
			className="mb-2 flex pl-2"
			data-testid={`element-${ElementType.Text}`}
		>
			<EditText
				fontStyles={`${
					FgColors[styles.elementTextColor]
				} text-sm lg:text-lg`}
				onTextChanged={onTextChanged}
				text={element.text}
				className="grow"
				multiline
				onBlur={onBlur}
			/>
		</div>
	)
}
