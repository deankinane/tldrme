import React, { useCallback, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import ElementTypeButton from './element-type-button'
import { ElementType } from '@prisma/client'
interface Props {
	onAddElementClicked: (type: ElementType) => void
}

export default function AddElementButton({ onAddElementClicked }: Props) {
	const [menuOpen, setMenuOpen] = useState(false)

	const onToggleClick = useCallback(() => {
		setMenuOpen(!menuOpen)
	}, [menuOpen])

	const onAddSubtitleClick = useCallback(() => {
		setMenuOpen(false)
		onAddElementClicked(ElementType.SubTitle)
	}, [onAddElementClicked])

	return (
		<div className="m-2 mb-4 flex">
			<button
				className="mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-800 p-2 font-bold text-white transition-colors hover:bg-purple-600"
				onClick={onToggleClick}
				data-testid="add-element-button"
			>
				<PlusIcon />
			</button>
			{menuOpen ? (
				<div>
					<ElementTypeButton onClick={onAddSubtitleClick}>
						Subtitle
					</ElementTypeButton>
					<ElementTypeButton>Icon Text</ElementTypeButton>
					<ElementTypeButton>Bullet Text</ElementTypeButton>
					<ElementTypeButton>Text</ElementTypeButton>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}
