import React, { useCallback, useRef, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import ElementTypeButton from './element-type-button'
import { ElementType } from '@prisma/client'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Spinner from '@/modules/common/components/spinner'

const buttonList = [
	{
		text: 'Subtitle',
		type: ElementType.SubTitle,
	},
	{
		text: 'Icon Text',
		type: ElementType.IconText,
	},
	{
		text: 'Bullet Text',
		type: ElementType.BulletText,
	},
	{
		text: 'Text',
		type: ElementType.Text,
	},
]

interface Props {
	onAddElementClicked: (type: ElementType) => void
	isLoading: boolean
}

export default function AddElementButton({
	onAddElementClicked,
	isLoading,
}: Props) {
	const [menuOpen, setMenuOpen] = useState(false)
	const [animateRef] = useAutoAnimate<HTMLDivElement>()
	const buttonRef = useRef<HTMLButtonElement>(null)

	const onToggleClick = useCallback(() => {
		if (menuOpen) {
			buttonRef.current?.blur()
		}
		setMenuOpen(!menuOpen)
	}, [menuOpen])

	const onAddButtonClick = useCallback(
		(type: ElementType) => {
			setMenuOpen(false)
			onAddElementClicked(type)
		},
		[onAddElementClicked]
	)

	const onButtonBlur = useCallback(() => {
		setTimeout(() => setMenuOpen(false), 100)
	}, [])

	return (
		<div className="ml-2 mt-4 mb-4 flex">
			<button
				className="mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-800 p-2 font-bold text-white transition-all hover:bg-indigo-600 focus:rotate-45"
				onClick={onToggleClick}
				onBlur={onButtonBlur}
				data-testid="show-options-button"
				ref={buttonRef}
			>
				{isLoading ? <Spinner /> : <PlusIcon />}
			</button>
			<div ref={animateRef} className="grow">
				{menuOpen ? (
					buttonList.map((b) => (
						<ElementTypeButton
							key={b.text}
							onClick={() => onAddButtonClick(b.type)}
							data-testid={`add-element-button-${b.type}`}
						>
							{b.text}
						</ElementTypeButton>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	)
}
