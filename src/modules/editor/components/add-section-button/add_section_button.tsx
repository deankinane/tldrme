import Spinner from '@/modules/common/components/spinner'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'

interface Props {
	onAddSectionClicked: () => void
	isLoading: boolean
}

export default function AddSectionButton({
	onAddSectionClicked,
	isLoading,
}: Props) {
	return (
		<button
			className="mb-8 flex w-full items-center justify-center rounded-md border border-dashed border-indigo-500 bg-indigo-200 p-8 font-bold text-indigo-900 transition-all hover:bg-purple-300"
			onClick={onAddSectionClicked}
			data-testid="add-section-button"
		>
			{isLoading ? (
				<>
					<Spinner className="h-6 w-6" data-testid="spinner" />
				</>
			) : (
				<>
					<PlusCircleIcon className="mr-2 w-6" data-testid="icon" />
					Add Section
				</>
			)}
		</button>
	)
}
