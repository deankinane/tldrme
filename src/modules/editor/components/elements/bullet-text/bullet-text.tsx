import { useSmallScreen } from '@/utils/hooks/useMediaQuery'
import { ElementType } from '@prisma/client'
import React, { useCallback } from 'react'
import EditText from '../../edit-text/edit-text'
import type { ElementProps } from '../common/element-props'

export default function BulletTextElement({
	element,
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

	const smallScreen = useSmallScreen()

	return (
		<div
			className="mb-2 flex"
			data-testid={`element-${ElementType.IconText}`}
		>
			<div>
				<svg viewBox="0 0 20 20" className="mx-2 w-6">
					<circle
						cx={smallScreen ? 8 : 10}
						cy={smallScreen ? 8 : 11}
						r="5"
						fill="black"
					/>
				</svg>
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
