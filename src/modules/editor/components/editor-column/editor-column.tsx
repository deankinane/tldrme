import React, { useCallback, useState } from 'react'
import AddSectionButton from '@/modules/editor/components/add-section-button/add_section_button'
import Section from '@/modules/editor/components/section/section'
import DropTarget from '@/modules/editor/components/section/drop-target'
import { type SectionModel } from '@/utils/common/types'

interface Props {
	columnId: number
	sections: SectionModel[]
	onAddSection: (columnId: number) => void
	onUpdateSection: (s: SectionModel) => void
	onRemoveSection: (s: SectionModel) => void
	onSectionDropped: (
		columnId: number,
		draggedItemIndex: number,
		dropTargetIndex: number
	) => void
}

export default function EditorColumn({
	columnId,
	sections,
	onAddSection,
	onUpdateSection,
	onRemoveSection,
	onSectionDropped,
}: Props) {
	const [draggedItemIndex, setDraggedItemIndex] = useState(-1)

	const onDragStart = useCallback((index: number) => {
		setDraggedItemIndex(index)
	}, [])

	const onItemDropped = useCallback(
		(droppedIndex: number) => {
			onSectionDropped(columnId, draggedItemIndex, droppedIndex)
			setDraggedItemIndex(-1)
		},
		[columnId, draggedItemIndex, onSectionDropped]
	)

	const onAddSectionClicked = useCallback(() => {
		onAddSection(columnId)
	}, [onAddSection, columnId])

	return (
		<div>
			{sections.map((s, i) => (
				<div key={s.id}>
					<DropTarget index={i} onItemDropped={onItemDropped} />
					<Section
						index={i}
						model={s}
						onDragStart={onDragStart}
						onModelUpdated={onUpdateSection}
					></Section>
				</div>
			))}
			<DropTarget index={sections.length} onItemDropped={onItemDropped} />
			<AddSectionButton onAddSectionClicked={onAddSectionClicked} />
		</div>
	)
}
