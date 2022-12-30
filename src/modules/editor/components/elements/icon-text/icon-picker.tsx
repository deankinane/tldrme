import { PossibleIcons, PossibleIconsArray } from 'heroicons-lookup'
import React, { useCallback, useState, useMemo } from 'react'
import IconLookup from './icon-lookup'

interface Props {
	open: boolean
	onIconClick: (icon: PossibleIcons) => void
}
export default function IconPicker({ open, onIconClick }: Props) {
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
				<div className="absolute z-20 ml-12 -mt-8 w-64 rounded-md bg-gray-200 p-4 shadow-lg">
					<div className="mb-8">
						<p className="mb-2 text-sm font-light">Search Icons</p>
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
							<p className="text-xs font-light">No icons found</p>
						) : (
							<></>
						)}
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}
