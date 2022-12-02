import { ElementType } from '@prisma/client'
import type { PossibleIcons } from 'heroicons-lookup'
import { lookupIcon } from 'heroicons-lookup'
import React, { useCallback } from 'react'
import EditText from '../../edit-text/edit-text'
import type { ElementProps } from '../common/element-props'

export default function IconTextElement({
	element,
	onElementUpdated,
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
		<div
			className="mb-2 flex"
			data-testid={`element-${ElementType.IconText}`}
		>
			<div className="mt-1">
				<Icon className="mx-2 w-6" />
			</div>

			<EditText
				fontStyles="text-sm lg:text-lg"
				onTextChanged={onTextChanged}
				text={element.text}
				className="grow"
				multiline
			/>
		</div>
	)
}
