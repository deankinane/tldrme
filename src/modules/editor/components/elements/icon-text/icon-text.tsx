import { ElementType } from '@prisma/client'
import type { PossibleIcons } from 'heroicons-lookup'
import { lookupIcon } from 'heroicons-lookup'
import React, { useCallback } from 'react'
import EditText from '../../edit-text/edit-text'
import type { ElementProps } from '../common/element-props'

export default function IconTextElement({
	element,
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
				<Icon className="mx-2 w-5 pt-1 lg:w-6 lg:pt-2" />
			</div>

			<EditText
				fontStyles="text-sm lg:text-lg"
				onTextChanged={onTextChanged}
				text={element.text}
				className="grow"
				multiline
				onBlur={onBlur}
			/>
		</div>
	)
}
