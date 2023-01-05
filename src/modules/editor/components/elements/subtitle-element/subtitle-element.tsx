import { ElementType } from '@prisma/client'
import React, { useCallback } from 'react'
import EditText from '../../edit-text/edit-text'
import { FgColors } from '../../sidebar/components/color-picker/color-picker'
import type { ElementProps } from '../common/element-props'

export default function SubTitleElement({
	element,
	styles,
	onElementUpdated,
	onBlur,
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
				fontStyles={`${
					FgColors[styles.sectionSubtitleColor]
				} el-subtitle`}
				onTextChanged={onTextChanged}
				text={element.text}
				onBlur={onBlur}
			/>
		</div>
	)
}
