import type { ChangeEvent } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import React, { useCallback, useState } from 'react'

interface Props extends React.ComponentProps<'div'> {
	fontStyles: string
	text?: string
	multiline?: boolean
	onTextChanged: (text: string) => void
	onBlur: () => void
}

export default function EditText({
	fontStyles,
	text = 'Click to edit',
	onTextChanged,
	multiline = false,
	onBlur,
	...props
}: Props) {
	const [editMode, setEditMode] = useState(false)
	const [inputValue, setInputValue] = useState(text)
	const textAreaElement = useRef<HTMLTextAreaElement>(null)
	const textInputElement = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (textAreaElement.current) textAreaElement.current.focus()
		if (textInputElement.current) textInputElement.current.focus()
	}, [editMode])

	const onInputBlurred = useCallback(() => {
		setEditMode(false)
		if (inputValue !== text) onTextChanged(inputValue)

		onBlur()
	}, [inputValue, text, onTextChanged, onBlur])

	const onTextClicked = useCallback(() => {
		setEditMode(true)
	}, [])

	const onFocus = useCallback(() => {
		setTextAreaHeight(textAreaElement)
	}, [])

	const onInputChanged = useCallback(
		(ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setInputValue(ev.currentTarget.value)

			if (multiline) {
				setTextAreaHeight(textAreaElement)
			}
		},
		[multiline]
	)

	const onKeyDown = useCallback(
		(ev: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			if (ev.key === 'Enter') {
				onInputBlurred()
			}
		},
		[onInputBlurred]
	)

	return (
		<div {...props} data-testid="edit-text-wrapper">
			{editMode ? (
				multiline ? (
					<textarea
						onChange={onInputChanged}
						onFocus={onFocus}
						onBlur={onInputBlurred}
						className={`${fontStyles} w-full overflow-hidden rounded-md focus-visible:bg-amber-100 focus-visible:outline-none`}
						value={inputValue}
						ref={textAreaElement}
						onKeyDown={onKeyDown}
						data-testid="edit-text-input"
					/>
				) : (
					<input
						type="text"
						onChange={onInputChanged}
						onBlur={onInputBlurred}
						className={`${fontStyles} w-full rounded-md focus-visible:bg-amber-100 focus-visible:outline-none`}
						value={inputValue}
						ref={textInputElement}
						onKeyDown={onKeyDown}
						data-testid="edit-text-input"
					/>
				)
			) : (
				<p
					className={`${fontStyles} min-h-full w-full rounded-md transition-all duration-300 hover:bg-amber-100`}
					onClick={onTextClicked}
					data-testid="edit-text-p"
				>
					{text}
				</p>
			)}
		</div>
	)
}

function setTextAreaHeight(
	textAreaElement: React.RefObject<HTMLTextAreaElement>
) {
	textAreaElement.current?.setAttribute('style', `height: 0px`)
	textAreaElement.current?.setAttribute(
		'style',
		`height: ${Math.max(textAreaElement.current?.scrollHeight, 24)}px`
	)
}
