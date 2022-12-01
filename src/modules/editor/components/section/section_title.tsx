import React, { useCallback, useRef, useState } from 'react'
import EditText from '../edit-text/edit-text'
import {
	ChevronDownIcon,
	ChevronUpIcon,
	TrashIcon,
} from '@heroicons/react/24/solid'
import MobileActionButton from './mobile-action-button'
import { isMobile } from 'react-device-detect'

interface Props extends React.HTMLAttributes<HTMLElement> {
	text: string
	onTextChanged: (text: string) => void
	onRemoveClicked: () => void
	onMoveUpClicked: () => void
	onMoveDownClicked: () => void
}
export default function SectionTitle({
	text,
	onTextChanged,
	onRemoveClicked,
	onMoveUpClicked,
	onMoveDownClicked,
	...props
}: Props) {
	const [selected, setSelected] = useState(false)
	const timer = useRef<NodeJS.Timeout>()

	const onCommit = useCallback(
		(newText: string) => {
			setSelected(false)
			if (newText !== text) onTextChanged(newText)
		},
		[onTextChanged, text]
	)

	const onSelect = useCallback(() => {
		setSelected(true)
		timer.current = setTimeout(() => {
			setSelected(false)
		}, 3000)
	}, [])

	const onClickEditText = useCallback(() => {
		if (timer.current) {
			clearTimeout(timer.current)
		}
	}, [])

	return isMobile && !selected ? (
		<p
			className={`p-2 text-xl font-medium text-purple-800 lg:text-3xl`}
			onClick={onSelect}
			data-testid="section-title-p"
		>
			{text}
		</p>
	) : (
		<div className="">
			<EditText
				fontStyles="text-xl lg:text-3xl font-medium text-purple-800 p-2"
				text={text}
				onTextChanged={onCommit}
				interactive={!isMobile || selected}
				className={`${selected ? 'rounded-lg bg-purple-100' : ''}`}
				onClick={onClickEditText}
				{...props}
			/>
			{isMobile ? (
				<div className="absolute right-0 z-50 mt-2 flex flex-col rounded-full border border-purple-200 bg-purple-200 p-2 pb-0 shadow-md">
					{selected ? (
						<>
							<MobileActionButton onClick={onMoveUpClicked}>
								<ChevronUpIcon />
							</MobileActionButton>
							<MobileActionButton onClick={onMoveDownClicked}>
								<ChevronDownIcon />
							</MobileActionButton>
							<MobileActionButton onClick={onRemoveClicked}>
								<TrashIcon />
							</MobileActionButton>
						</>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}
		</div>
	)
}
