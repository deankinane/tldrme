import { useCallback, useEffect, useState } from 'react'
import React from 'react'
import SectionTitle from '@/modules/editor/components/section-title/section_title'
import type { SectionModel, SubTitleModel } from '@/utils/common/types'
import AddElementButton from '../add-element-button/add-element-button'
import { v4 as uuidv4 } from 'uuid'
import { trpc } from '@/utils/trpc'

interface Props {
	index: number
	model: SectionModel
	onModelUpdated: (model: SectionModel) => void
	onDragStart: (index: number) => void
	onDragEnd: () => void
}

export default function Section({
	index,
	model: pModel,
	onModelUpdated,
	onDragStart,
	onDragEnd,
}: Props) {
	const [dragged, setDragged] = useState(false)
	const [model] = useState(pModel)

	const mUpdateSectionTitle = trpc.editor.updateSectionTitle.useMutation()

	const dragStart = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			ev.dataTransfer.setData(
				'sourceColumn',
				model.columnIndex.toString()
			)
			ev.dataTransfer.setData('itemId', model.id)
			ev.dataTransfer.setData('itemIndex', index.toString())
			setDragged(true)
			onDragStart(index)
		},
		[index, model.columnIndex, model.id, onDragStart]
	)

	const dragEnd = useCallback(() => {
		setDragged(false)
		onDragEnd()
	}, [onDragEnd])

	const onTextChanged = useCallback(
		(text: string) => {
			text = text === '' ? 'Section Title' : text
			mUpdateSectionTitle.mutate({
				sectionId: model.id,
				title: text,
			})

			model.title = text
			onModelUpdated(model)
		},
		[mUpdateSectionTitle, model, onModelUpdated]
	)

	const onAddElementClicked = useCallback(() => {
		const newEl: SubTitleModel = {
			id: uuidv4(),
			order: model.elements.length,
			type: 'SubTitle',
			sectionId: model.id,
			elementSubTitle: {
				elementId: '',
				id: '',
				text: 'Subtitle',
			},
		}

		model.elements.push(newEl)
		onModelUpdated(model)
	}, [model, onModelUpdated])

	return (
		<div
			className={`${dragged ? 'opacity-50' : ''}`}
			draggable={true}
			onDragStart={dragStart}
			onDragEnd={dragEnd}
		>
			<SectionTitle text={model.title} onTextChanged={onTextChanged} />
			{model.elements.map((e) => {
				if (e.type === 'SubTitle') return <div>Subtitle</div>
				if (e.type === 'IconText') return <div>IconText</div>
			})}
			<AddElementButton onAddElementClicked={onAddElementClicked} />
		</div>
	)
}
