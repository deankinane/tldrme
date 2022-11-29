import React from 'react'

interface Props {
	onAddElementClicked: () => void
}

export default function AddElementButton({ onAddElementClicked }: Props) {
	return (
		<div
			className="m-2 grid cursor-pointer select-none items-center justify-center border border-dashed border-gray-500 bg-slate-200 p-2"
			onClick={onAddElementClicked}
			data-testid="add-element-button"
		>
			<p>Add Element</p>
		</div>
	)
}
