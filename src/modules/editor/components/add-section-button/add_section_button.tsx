import React from 'react'

interface Props {
	onAddSectionClicked: () => void
}

export default function AddSectionButton({ onAddSectionClicked }: Props) {
	return (
		<div
			className="grid cursor-pointer select-none items-center justify-center border border-dashed border-gray-500 bg-slate-200 p-8"
			onClick={onAddSectionClicked}
			data-testid="add-section-button"
		>
			<p>Add Section</p>
		</div>
	)
}
