import React, { useState } from 'react'
const colors = [
	'bg-[#334155]',
	'bg-[#b91c1c]',
	'bg-[#b45309]',
	'bg-[#15803d]',
	'bg-[#0f766e]',
	'bg-[#0369a1]',
	'bg-[#1d4ed8]',
	'bg-[#4338ca]',
	'bg-[#a21caf]',
	'bg-[#be123c]',
	'bg-[#000000]',
]
export const ColorPicker = () => {
	const [color, setColor] = useState('#000000')

	return (
		<div className="grid w-60 grid-cols-4 grid-rows-2 rounded-md border border-black bg-white p-2">
			{colors.map((c) => (
				<div
					key={c}
					onClick={() => setColor(c)}
					className={`${
						c === color ? 'border' : ''
					} border-black-100 m-1 rounded-full bg-white p-1`}
				>
					<div className={`${c} h-6 w-6 rounded-full`}></div>
				</div>
			))}
		</div>
	)
}
