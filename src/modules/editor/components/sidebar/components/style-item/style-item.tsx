import React from 'react'
import { ColorPicker } from '../color-picker/color-picker'

interface Props extends React.ComponentProps<'div'> {
	label: string
	initialColor: number
	onColorChanged: (color: number) => void
}

export default function StyleItem({
	label,
	initialColor,
	onColorChanged,
	...props
}: Props) {
	return (
		<div {...props} className={`${props.className} flex`}>
			<div className="grow">{label}</div>
			<ColorPicker
				initialColor={initialColor}
				className="flex-none"
				onColorChanged={onColorChanged}
			/>
		</div>
	)
}
