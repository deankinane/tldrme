import { ElementType } from '@prisma/client'
import React, { useCallback } from 'react'
import EditText from '../../edit-text/edit-text'
import { FgColors } from '../../sidebar/components/color-picker/color-picker'
import type { ElementProps } from '../common/element-props'

export default function InfoTextElement({
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
		<div className="flex" data-testid={`element-${ElementType.InfoText}`}>
			<EditText
				fontStyles={`${
					FgColors[styles.infoTextColor]
				} text-xs lg:text-sm font-semibold`}
				onTextChanged={onTextChanged}
				text={element.text}
				className="grow"
				multiline
				onBlur={onBlur}
			/>
		</div>
	)
}
