import { useCallback, useRef, useState } from 'react'
import React from 'react'
import SectionTitle from '@/modules/editor/components/section-title/section_title'
import type { SectionModel } from '@/utils/common/types'
import AddElementButton from '../add-element-button/add-element-button'
import { v4 as uuidv4 } from 'uuid'
import { trpc } from '@/utils/trpc'
import type { Element } from '@prisma/client'
import BaseElement from '../elements/base-element'

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
	const mAddElement = trpc.editor.addElement.useMutation({
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
		const newEl: Element = {
			id: uuidv4(),
			order: model.elements.length,
			type: 'SubTitle',
			sectionId: model.id,
			text: 'Subtitle',
			icon: '',
		}

		newQueue.current.push(newEl.id)

		model.elements.push(newEl)
		onModelUpdated(model)
		mAddElement.mutate({
			sectionId: model.id,
			order: model.elements.length,
			type: 'SubTitle',
		})
	}, [mAddElement, model, onModelUpdated])

	const onAddElementClicked = useCallback(() => {
		addSubtitle()
	}, [addSubtitle])

	const onElementUpdated = useCallback(
		(element: Element) => {
			const idx = model.elements.findIndex((x) => x.id === element.id)
			model.elements.splice(idx, 1, element)
			onModelUpdated(model)
		},
		[model, onModelUpdated]
	)

	return (
		<div
			className={`${dragged ? 'opacity-50' : ''}`}
			draggable={true}
			onDragStart={dragStart}
			onDragEnd={dragEnd}
		>
			<SectionTitle text={model.title} onTextChanged={onTextChanged} />
			{model.elements.map((e) => {
				return (
					<BaseElement
						key={e.id}
						element={e}
						onElementUpdated={onElementUpdated}
						onDragEnd={() => {
							return
						}}
						onDragStart={() => {
							return
						}}
					/>
				)
			})}
			<AddElementButton onAddElementClicked={onAddElementClicked} />
		</div>
	)
}
