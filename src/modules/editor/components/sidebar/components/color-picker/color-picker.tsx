import React, { useCallback, useState } from 'react'
export const BgColors = [
	'bg-[#000000]',
	'bg-[#0f172a]',
	'bg-[#334155]',
	'bg-[#525252]',
	'bg-[#78716c]',
	'bg-[#9ca3af]',
	'bg-[#15803d]',
	'bg-[#0f766e]',
	'bg-[#0369a1]',
	'bg-[#1d4ed8]',
	'bg-[#4338ca]',
	'bg-[#a21caf]',
	'bg-[#db2777]',
	'bg-[#dc2626]',
	'bg-[#ea580c]',
	'bg-[#fde047]',
]

export const FgColors = [
	'text-[#000000]',
	'text-[#0f172a]',
	'text-[#334155]',
	'text-[#525252]',
	'text-[#78716c]',
	'text-[#9ca3af]',
	'text-[#15803d]',
	'text-[#0f766e]',
	'text-[#0369a1]',
	'text-[#1d4ed8]',
	'text-[#4338ca]',
	'text-[#a21caf]',
	'text-[#db2777]',
	'text-[#dc2626]',
	'text-[#ea580c]',
	'text-[#fde047]',
]

interface Props extends React.ComponentProps<'div'> {
	initialColor?: number
	onColorChanged: (color: number) => void
}

export const ColorPicker = ({
	onColorChanged,
	initialColor,
	...props
}: Props) => {
	const [open, setOpen] = useState(false)
	const [color, setColor] = useState(BgColors[initialColor ?? 0])
	const onColorClicked = useCallback((c: string) => {
		const cidx = BgColors.findIndex((x) => x === c)
		setColor(c)
		onColorChanged(cidx)
		setOpen(false)
	}, [])

	return (
		<div className={`${props.className} relative`} {...props}>
			<div className="rounded-full bg-white p-1">
				<div
					className={`${color} h-6 w-6 rounded-full`}
					onClick={() => setOpen(!open)}
				></div>
			</div>
			{open ? (
				<div className="absolute ml-12 -mt-8 flex w-48 flex-wrap rounded-md bg-gray-100 p-2 shadow-lg">
					{BgColors.map((c) => (
						<div
							key={c}
							onClick={() => onColorClicked(c)}
							className={`${
								c === color ? '!border-slate-400' : ''
							} m-1 rounded-full border border-white bg-white p-1`}
						>
							<div className={`${c} h-6 w-6 rounded-full`}></div>
						</div>
					))}
				</div>
			) : (
				<></>
			)}
		</div>
	)
}
