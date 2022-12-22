import { argv0 } from 'process'
import React, { useCallback, useState } from 'react'
const colors = [
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

interface Props {
	onColorChanged: (color: string) => void
}

export const ColorPicker = ({ onColorChanged }: Props) => {
	const [open, setOpen] = useState(false)
	const [color, setColor] = useState(colors[0])
	const onColorClicked = useCallback((c: string) => {
		setColor(c)
		onColorChanged(c)
	}, [])

	return (
		<>
			{open ? (
				<div>
					<div
						className={`${color} h-6 w-6 rounded-md`}
						onClick={() => setOpen(!open)}
					></div>
				</div>
			) : (
				<div className="flex w-64 flex-wrap rounded-md border border-black bg-white p-2">
					{colors.map((c) => (
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
			)}
		</>
	)
}
