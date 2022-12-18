import React from 'react'
import { ColorPicker } from './components/color-picker/color-picker'

export const Sidebar = () => {
	return (
		<div className="hidden h-full w-80 shrink-0 bg-[#00000077] xl:block">
			<div className="p-8 text-white">
				<p className="text-lg font-semibold">Section Styles</p>
				<div className="my-4">
					<div className="flex items-center">
						<label htmlFor="title-color">Title Colour</label>
						<ColorPicker />
					</div>
				</div>
			</div>
		</div>
	)
}
