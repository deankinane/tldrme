import { ElementType } from '@prisma/client'
import type { PossibleIcons } from 'heroicons-lookup'
import { lookupIcon } from 'heroicons-lookup'
import React, { useCallback, useMemo, useState } from 'react'
import EditText from '../../edit-text/edit-text'
import {
	BgColors,
	FgColors,
} from '../../sidebar/components/color-picker/color-picker'
import type { ElementProps } from '../common/element-props'
import IconPicker from './icon-picker'

export default function IconTextElement({
	element,
	styles,
	onElementUpdated,
	onBlur,
}: ElementProps) {
	const Icon = useMemo(
		() => lookupIcon(element.icon as PossibleIcons, 'solid'),
		[element.icon]
	)
	const [open, setOpen] = useState(false)

	const onTextChanged = useCallback(
		(text: string) => {
			if (element.text === text) return
			element.text = text
			onElementUpdated(element)
		},
		[element, onElementUpdated]
	)

	const onIconChanged = useCallback(
		(icon: PossibleIcons) => {
			element.icon = icon
			onElementUpdated(element)
			setOpen(false)
		},
		[element, onElementUpdated]
	)

	return (
		<>
			<div
				className="mb-2 flex"
				data-testid={`element-${ElementType.IconText}`}
			>
				<div onClick={() => setOpen((o) => !o)}>
					<Icon
						className={`${
							FgColors[styles.iconColor]
						} mx-2 w-5 pt-1 lg:w-6 lg:pt-1`}
					/>
				</div>

				<EditText
					fontStyles={`${
						FgColors[styles.elementTextColor]
					} text-sm lg:text-base`}
					onTextChanged={onTextChanged}
					text={element.text}
					className="grow"
					multiline
					onBlur={onBlur}
				/>
			</div>

			{open ? (
				<IconPicker
					open={open}
					onIconClick={onIconChanged}
					closePicker={() => setOpen(false)}
				/>
			) : (
				<></>
			)}
		</>
	)
}
