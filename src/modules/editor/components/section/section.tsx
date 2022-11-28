import { useCallback, useState } from 'react'
import React from 'react'
import SectionTitle from '@/modules/editor/components/section-title/section_title'
import type { SectionModel } from '@/utils/common/types'

interface Props {
	index: number
	model: SectionModel
	onModelUpdated: (model: SectionModel) => void
	onDragStart: (index: number) => void
}

export default function Section({
	index,
	model,
	onModelUpdated,
	onDragStart,
}: Props) {
	const [dragged, setDragged] = useState(false)

	const dragStart = useCallback(() => {
		setDragged(true)
		onDragStart(index)
	}, [index, onDragStart])

	const dragEnd = useCallback(() => {
		setDragged(false)
	}, [])

	const onTextChanged = useCallback(
		(text: string) => {
			model.title = text
			onModelUpdated(model)
		},
		[model, onModelUpdated]
	)

	return (
		<div
			className={`${dragged ? 'opacity-50' : ''}`}
			draggable={true}
			onDragStart={() => dragStart()}
			onDragEnd={() => dragEnd()}
		>
			<SectionTitle text={model.title} onTextChanged={onTextChanged} />
		</div>
	)
}
