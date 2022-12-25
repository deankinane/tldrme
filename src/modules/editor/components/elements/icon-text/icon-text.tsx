import { ElementType } from '@prisma/client'
import type { PossibleIcons } from 'heroicons-lookup'
import { lookupIcon } from 'heroicons-lookup'
import React, { useCallback } from 'react'
import EditText from '../../edit-text/edit-text'
import {
	BgColors,
	FgColors,
} from '../../sidebar/components/color-picker/color-picker'
import type { ElementProps } from '../common/element-props'

export default function IconTextElement({
	element,
	styles,
	onElementUpdated,
	onBlur,
}: ElementProps) {
	const Icon = lookupIcon('FolderIcon' as PossibleIcons, 'solid')

	const onTextChanged = useCallback(
		(text: string) => {
			if (element.text === text) return
			element.text = text
			onElementUpdated(element)
		},
		[element, onElementUpdated]
	)

	return (
		<div className="flex" data-testid={`element-${ElementType.IconText}`}>
			<div>
				<Icon
					className={`${
						FgColors[styles.iconColor]
					} mx-2 w-5 pt-1 lg:w-6 lg:pt-2`}
				/>
			</div>

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
