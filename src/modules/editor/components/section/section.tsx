import { useCallback, useEffect, useRef, useState } from 'react'
import React from 'react'
import SectionTitle from '@/modules/editor/components/section-title/section_title'
import type { SectionModel, SubTitleModel } from '@/utils/common/types'
import AddElementButton from '../add-element-button/add-element-button'
import { v4 as uuidv4 } from 'uuid'
import { trpc } from '@/utils/trpc'
import SubTitleElement from '../elements/subtitle-element/subtitle-element'

interface Props {
	index: number
	model: SectionModel
	onModelUpdated: (model: SectionModel) => void
	onDragStart: () => void
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
	const newQueue = useRef<string[]>([])

	const mUpdateSectionTitle = trpc.editor.updateSectionTitle.useMutation()
	const mAddSubTitle = trpc.editor.addSubTitleElement.useMutation({
		onSuccess: (d) => {
			if (!d) return
			const mergeId =
				newQueue.current.length > 0
					? newQueue.current.splice(0, 1)[0]
					: undefined

			if (mergeId) {
				model.elements.forEach(
					(e) => (e.id = e.id === mergeId ? d.id : e.id)
				)
				onModelUpdated(model)
			}
		},
	})
	const dragStart = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			ev.dataTransfer.setData(
				'sourceColumn',
				model.columnIndex.toString()
			)
			ev.dataTransfer.setData('itemId', model.id)
			ev.dataTransfer.setData('itemIndex', index.toString())
			setDragged(true)
			onDragStart()
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

	const addSubtitle = useCallback(() => {
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

		newQueue.current.push(newEl.id)

		model.elements.push(newEl)
		onModelUpdated(model)
		mAddSubTitle.mutate({
			sectionId: model.id,
			order: model.elements.length,
		})
	}, [mAddSubTitle, model, onModelUpdated])

	const onAddElementClicked = useCallback(() => {
		addSubtitle()
	}, [addSubtitle])

	return (
		<div
			className={`${dragged ? 'opacity-50' : ''}`}
			draggable={true}
			onDragStart={dragStart}
			onDragEnd={dragEnd}
		>
			<SectionTitle text={model.title} onTextChanged={onTextChanged} />
			{model.elements.map((e) => {
				if (e.type === 'SubTitle')
					return (
						<SubTitleElement
							key={e.id}
							model={e as SubTitleModel}
						/>
					)
				else if (e.type === 'IconText')
					return <div key={e.id}>IconText</div>
			})}
			<AddElementButton onAddElementClicked={onAddElementClicked} />
		</div>
	)
}
