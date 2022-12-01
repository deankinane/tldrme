import React, { useCallback, useRef, useState } from 'react'
import EditText from '../edit-text/edit-text'
import { useSmallScreen } from '@/utils/hooks/useMediaQuery'
import {
	ArrowDownIcon,
	ArrowUpIcon,
	TrashIcon,
} from '@heroicons/react/24/solid'

interface Props extends React.HTMLAttributes<HTMLElement> {
	text: string
	onTextChanged: (text: string) => void
}
export default function SectionTitle({ text, onTextChanged, ...props }: Props) {
	const smallScreen = useSmallScreen()
	const [selected, setSelected] = useState(false)
	const timer = useRef<NodeJS.Timeout>()

	const onCommit = useCallback(
		(text: string) => {
			setSelected(false)
			onTextChanged(text)
		},
		[onTextChanged]
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

	return smallScreen && !selected ? (
		<p
			className={`p-2 text-xl font-medium text-purple-800 lg:text-3xl`}
			onClick={onSelect}
			data-testid="section-title-p"
		>
			{text}
		</p>
	) : (
		<div className="flex max-w-full">
			<EditText
				fontStyles="text-xl lg:text-3xl font-medium text-purple-800 p-2"
				text={text}
				onTextChanged={onCommit}
				interactive={!smallScreen || selected}
				className="shrink grow"
				onClick={onClickEditText}
				{...props}
			/>
			<div className="flex w-fit shrink-0 items-center">
				{selected ? (
					<div>
						<button className="ml-2 h-8 w-8 rounded-full bg-slate-400 p-2">
							<TrashIcon />
						</button>
						<button className="ml-2 h-8 w-8 rounded-full bg-slate-400 p-2">
							<ArrowUpIcon />
						</button>
						<button className="ml-2 h-8 w-8 rounded-full bg-slate-400 p-2">
							<ArrowDownIcon />
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}
