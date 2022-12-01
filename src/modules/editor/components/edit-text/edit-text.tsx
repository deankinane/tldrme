import type { ChangeEvent } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import React, { useCallback, useState } from 'react'

interface Props extends React.ComponentProps<'div'> {
	fontStyles: string
	text?: string
	interactive?: boolean
	multiline?: boolean
	onTextChanged: (text: string) => void
}

export default function EditText({
	fontStyles,
	text = 'Click to edit',
	onTextChanged,
	interactive = true,
	multiline = false,
	...props
}: Props) {
	const [editMode, setEditMode] = useState(false)
	const [inputValue, setInputValue] = useState(text)
	const element = useRef<HTMLInputElement>(null)
	const [rows, setRows] = useState(1)

	useEffect(() => {
		if (element.current) element.current.focus()
	}, [editMode])

	const onInputBlurred = useCallback(() => {
		setEditMode(false)
		onTextChanged(inputValue)
	}, [onTextChanged, inputValue])

	const onTextClicked = useCallback(() => {
		if (interactive) setEditMode(true)
	}, [interactive])

	const onInputChanged = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
		setInputValue(ev.currentTarget.value)
	}, [])

	const onKeyDown = useCallback(
		(ev: React.KeyboardEvent<HTMLInputElement>) => {
			if (ev.key === 'Enter') {
				onInputBlurred()
			}
		},
		[onInputBlurred]
	)

	return (
		<div {...props} data-testid="edit-text-wrapper">
			{editMode ? (
				<input
					type="text"
					onChange={onInputChanged}
					onBlur={onInputBlurred}
					className={`${fontStyles} w-full rounded-md focus-visible:bg-amber-100 focus-visible:outline-none`}
					value={inputValue}
					ref={element}
					onKeyDown={onKeyDown}
					data-testid="edit-text-input"
				/>
			) : (
				<p
					className={`${fontStyles} rounded-md transition-all duration-300 hover:bg-amber-100`}
					onClick={onTextClicked}
					data-testid="edit-text-p"
				>
					{text}
				</p>
			)}
		</div>
	)
}
