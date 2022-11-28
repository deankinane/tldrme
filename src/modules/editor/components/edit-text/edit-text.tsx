import type { ChangeEvent } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import React, { useCallback, useState } from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
	fontStyles: string
	text?: string
	onTextChanged: (text: string) => void
}

export default function EditText({
	fontStyles,
	text = 'Click to edit',
	onTextChanged,
	...props
}: Props) {
	const [editMode, setEditMode] = useState(false)
	const [inputValue, setInputValue] = useState(text)
	const element = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (element.current) element.current.focus()
	}, [editMode])

	const onInputBlurred = useCallback(() => {
		setEditMode(false)
		onTextChanged(inputValue)
	}, [onTextChanged, inputValue])

	const onTextClicked = useCallback(() => {
		setEditMode(true)
	}, [])

	const onInputChanged = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
		setInputValue(ev.currentTarget.value)
	}, [])

	return (
		<div {...props} data-testid="edit-text-wrapper">
			{editMode ? (
				<input
					type="text"
					onChange={onInputChanged}
					onBlur={onInputBlurred}
					className={`${fontStyles} w-full overflow-hidden rounded-md p-2 focus-visible:bg-amber-100 focus-visible:outline-none`}
					value={inputValue}
					ref={element}
					data-testid="edit-text-input"
				/>
			) : (
				<p
					className={`${fontStyles} overflow-hidden rounded-md p-2 transition-all duration-300 hover:bg-amber-100`}
					onClick={onTextClicked}
					data-testid="edit-text-p"
				>
					{text}
				</p>
			)}
		</div>
	)
}
