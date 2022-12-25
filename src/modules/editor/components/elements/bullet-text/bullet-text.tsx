import {
	MediaSize,
	useMediaQuery,
	useSmallScreen,
} from '@/utils/hooks/useMediaQuery'
import { ElementType } from '@prisma/client'
import React, { useCallback } from 'react'
import EditText from '../../edit-text/edit-text'
import {
	BgColors,
	FgColors,
} from '../../sidebar/components/color-picker/color-picker'
import type { ElementProps } from '../common/element-props'

export default function BulletTextElement({
	element,
	styles,
	onElementUpdated,
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
			className=" flex"
			data-testid={`element-${ElementType.BulletText}`}
		>
			<div>
				<svg
					viewBox="0 0 20 20"
					className="mx-2 w-5 pt-1 lg:w-6 lg:pt-2"
				>
					<circle
						cx={10}
						cy={10}
						r={5}
						fill={`${BgColors[styles.bulletColor]
							?.replace('bg-[', '')
							.replace(']', '')}`}
					/>
				</svg>
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
