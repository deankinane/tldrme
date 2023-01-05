import { PossibleIcons, PossibleIconsArray } from 'heroicons-lookup'
import React, { useCallback, useState, useMemo } from 'react'
import IconLookup from './icon-lookup'

interface Props {
	open: boolean
	onIconClick: (icon: PossibleIcons) => void
	closePicker: () => void
}
export default function IconPicker({ open, onIconClick, closePicker }: Props) {
	const [search, setSearch] = useState('')
	const icons = useMemo(
		() =>
			search.length === 0
				? PossibleIconsArray.slice(0, 24)
				: PossibleIconsArray.filter(
						(i) =>
							i.toLowerCase().indexOf(search.toLowerCase()) >= 0
				  ),
		[search]
	)

	const onSearchChanged = useCallback(
		(ev: React.ChangeEvent<HTMLInputElement>) => {
			setSearch(ev.currentTarget.value)
		},
		[icons]
	)

	return (
		<>
			{open ? (
				<>
					<div
						className="fixed top-0 bottom-0 left-0 right-0 z-10 bg-white opacity-30 sm:opacity-0"
						onClick={closePicker}
					></div>
					<div className="fixed top-1/3 left-1/2 z-20 -ml-32 w-64 rounded-md bg-gray-200 p-4 shadow-lg sm:absolute sm:ml-10 sm:-mt-8 sm:[top:unset] sm:[left:unset]">
						<div className="mb-8">
							<p className="mb-2 text-sm font-light">
								Search Icons
							</p>
							<input
								type="text"
								className="w-full"
								onChange={onSearchChanged}
							/>
						</div>
						<div className="flex max-h-48 flex-wrap overflow-y-auto">
							{icons.map((i) => (
								<div key={i} className={`p-2`}>
									<IconLookup
										icon={i}
										className="w-5"
										onClick={() => onIconClick(i)}
									/>
								</div>
							))}
							{icons.length === 0 ? (
								<p className="text-xs font-light">
									No icons found
								</p>
							) : (
								<></>
							)}
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</>
	)
}
