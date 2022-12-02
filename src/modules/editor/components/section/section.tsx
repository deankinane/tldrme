import { useCallback, useContext, useState } from 'react'
import React from 'react'
import SectionTitle from '@/modules/editor/components/section/section_title'
import type { SectionModel } from '@/utils/common/types'
import AddElementButton from '../add-element-button/add-element-button'
import { trpc } from '@/utils/trpc'
import type { Element, ElementType } from '@prisma/client'
import BaseElement from '../elements/base-element'
import { DraggableContext, DraggableType } from '../../utils/draggableContext'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ResumeContext } from '../../utils/resumeContext'
import reorderSections from '../../utils/reorder-sections'
import { withDropTarget } from '@/modules/common/components/withDropTarget'

interface Props {
	index: number
	model: SectionModel
	onModelUpdated: (model: SectionModel) => void
}

function Section({ index, model: pModel, onModelUpdated }: Props) {
	const [dragged, setDragged] = useState(false)
	const [model] = useState(pModel)
	const { dragData, setDragData, endDrag } = useContext(DraggableContext)
	const [animateRef] = useAutoAnimate<HTMLDivElement>()
	const { resume, updateResume } = useContext(ResumeContext)

	const mUpdateSectionTitle = trpc.editor.updateSectionTitle.useMutation()
	const mAddElement = trpc.editor.addElement.useMutation({
		onSuccess: (d) => {
			if (!d) return
			model.elements = [...model.elements, d]
			onModelUpdated(model)
		},
	})
	const mRemoveSection = trpc.editor.removeSection.useMutation()
	const mReorderSections = trpc.editor.reorderSection.useMutation()
	const mReorderElements = trpc.editor.reorderElement.useMutation()

	const dragStart = useCallback(() => {
		setDragData({
			itemInDrag: true,
			itemType: DraggableType.SECTION,
			sectionId: model.id,
			columnIndex: model.columnIndex,
			itemIndex: index,
		})
		setDragged(true)
	}, [index, model.columnIndex, model.id, setDragData])

	const dragEnd = useCallback(() => {
		setDragged(false)
		endDrag()
	}, [endDrag])

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

	const onAddElementClicked = useCallback(
		(type: ElementType) => {
			let order = 0
			model.elements.forEach(
				(e) => (order = e.order > order ? e.order : order)
			)
			order++

			mAddElement.mutate({
				sectionId: model.id,
				order: order,
				type: type,
			})
		},
		[mAddElement, model.elements, model.id]
	)

	const onElementUpdated = useCallback(
		(element: Element) => {
			const idx = model.elements.findIndex((x) => x.id === element.id)
			model.elements.splice(idx, 1, element)
			onModelUpdated(model)
		},
		[model, onModelUpdated]
	)

	const onRemoveClicked = useCallback(() => {
		mRemoveSection.mutate({
			sectionId: model.id,
		})
		resume.sections = resume.sections.filter((s) => s.id !== model.id)
		updateResume(resume)
	}, [mRemoveSection, model.id, resume, updateResume])

	const moveItem = useCallback(
		(newIndex: number) => {
			const columnSections = resume.sections.filter(
				(s) => s.columnIndex === model.columnIndex
			)

			const newOrder = reorderSections<SectionModel>(
				columnSections,
				index,
				newIndex
			) as SectionModel[]
			resume.sections = [
				...resume.sections.filter(
					(s) => s.columnIndex !== model.columnIndex
				),
				...newOrder,
			]
			updateResume(resume)
			mReorderSections.mutate(
				newOrder.map((s) => {
					return { sectionId: s.id, newOrder: s.order }
				})
			)
		},

		[index, mReorderSections, model.columnIndex, resume, updateResume]
	)

	const onMoveUpClicked = useCallback(() => {
		if (index === 0) return

		moveItem(index - 2)
	}, [index, moveItem])

	const onMoveDownClicked = useCallback(() => {
		const count = resume.sections.filter(
			(s) => s.columnIndex === model.columnIndex
		).length
		if (index === count - 1) return

		moveItem(index + 1)
	}, [index, model.columnIndex, moveItem, resume.sections])

	const validElementDropSource = useCallback(
		(targetIndex: number) => {
			return (
				dragData.itemType === DraggableType.ELEMENT &&
				dragData.sectionId === model.id &&
				(targetIndex > dragData.itemIndex ||
					Math.abs(targetIndex - dragData.itemIndex) > 1)
			)
		},
		[dragData.itemIndex, dragData.itemType, dragData.sectionId, model.id]
	)

	const onElementDropped = useCallback(
		(droppedIndex: number) => {
			const section = resume.sections.find((s) => s.id === model.id)
			const sectionIndex = resume.sections.findIndex(
				(s) => s.id === model.id
			)

			if (!section) return
			const draggedItemIndex = section?.elements.findIndex(
				(x) => x.id == dragData.elementId
			)
			const newOrder = reorderSections<Element>(
				section.elements || [],
				draggedItemIndex,
				droppedIndex
			) as Element[]

			section.elements = [...newOrder]
			resume.sections.splice(sectionIndex, 1, section)
			updateResume(resume)

			mReorderElements.mutate(
				newOrder.map((s) => {
					return { elementId: s.id, newOrder: s.order }
				})
			)
		},

		[dragData.elementId, mReorderElements, model.id, resume, updateResume]
	)

	return (
		<div className={`${dragged ? 'opacity-60' : ''} pt-8 pb-4`}>
			<SectionTitle
				text={model.title}
				onTextChanged={onTextChanged}
				draggable
				onDragStart={dragStart}
				onDragEnd={dragEnd}
				onRemoveClicked={onRemoveClicked}
				onMoveUpClicked={onMoveUpClicked}
				onMoveDownClicked={onMoveDownClicked}
			/>
			<div ref={animateRef}>
				{model.elements
					.sort((a, b) => a.order - b.order)
					.map((e, i) => {
						return (
							<BaseElement
								key={e.id}
								index={i}
								element={e}
								onElementUpdated={onElementUpdated}
								isValidSource={validElementDropSource}
								onItemDropped={onElementDropped}
							/>
						)
					})}
				<AddElementButton
					onAddElementClicked={onAddElementClicked}
					isLoading={mAddElement.isLoading}
				/>
			</div>
		</div>
	)
}

export default withDropTarget(Section)
