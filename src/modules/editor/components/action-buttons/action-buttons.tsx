import type { SectionModel } from '@/utils/common/types'
import type { Element } from '@prisma/client'
import { trpc } from '@/utils/trpc'
import {
	ChevronUpIcon,
	ChevronDownIcon,
	TrashIcon,
} from '@heroicons/react/24/solid'
import React, { useCallback, useContext } from 'react'
import { DraggableContext, DraggableType } from '../../utils/draggableContext'
import reorderSections from '../../utils/reorder-sections'
import { ResumeContext } from '../../utils/resumeContext'
import ActionButton from './action-button'
import { isMobile } from 'react-device-detect'

export default function ActionButtons() {
	const { dragData, endDrag } = useContext(DraggableContext)
	const { resume, updateResume } = useContext(ResumeContext)

	const mRemoveSection = trpc.editor.removeSection.useMutation()
	const mReorderSections = trpc.editor.reorderSection.useMutation()
	const mReorderElements = trpc.editor.reorderElement.useMutation()
	const mRemoveElement = trpc.editor.removeElement.useMutation()

	const moveSection = useCallback(
		(newIndex: number) => {
			const columnSections = resume.sections.filter(
				(s) => s.columnIndex === dragData.columnIndex
			)

			const newOrder = reorderSections<SectionModel>(
				columnSections,
				dragData.itemIndex,
				newIndex
			) as SectionModel[]
			resume.sections = [
				...resume.sections.filter(
					(s) => s.columnIndex !== dragData.columnIndex
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

		[
			dragData.columnIndex,
			dragData.itemIndex,
			mReorderSections,
			resume,
			updateResume,
		]
	)

	const moveElement = useCallback(
		(newIndex: number) => {
			const section = resume.sections.find(
				(s) =>
					s.elements.findIndex((e) => e.id === dragData.elementId) >
					-1
			)
			if (!section) return
			const sectionIndex = resume.sections.findIndex(
				(s) => s.id === section.id
			)
			if (newIndex === section.elements.length) return

			const draggedItemIndex = section?.elements.findIndex(
				(x) => x.id == dragData.elementId
			)
			const newOrder = reorderSections<Element>(
				section.elements || [],
				draggedItemIndex,
				newIndex
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

		[dragData.elementId, mReorderElements, resume, updateResume]
	)

	const onMoveUpClicked = useCallback(() => {
		if (dragData.itemIndex === 0) return
		if (dragData.itemType === DraggableType.SECTION)
			moveSection(dragData.itemIndex - 2)
		else if (dragData.itemType === DraggableType.ELEMENT)
			moveElement(dragData.itemIndex - 2)

		endDrag()
	}, [
		dragData.itemIndex,
		dragData.itemType,
		endDrag,
		moveElement,
		moveSection,
	])

	const onMoveDownClicked = useCallback(() => {
		if (dragData.itemType === DraggableType.SECTION) {
			const count = resume.sections.filter(
				(s) => s.columnIndex === dragData.columnIndex
			).length
			if (dragData.itemIndex === count - 1) return

			moveSection(dragData.itemIndex + 1)
		} else if (dragData.itemType === DraggableType.ELEMENT) {
			moveElement(dragData.itemIndex + 1)
		}

		endDrag()
	}, [
		dragData.columnIndex,
		dragData.itemIndex,
		dragData.itemType,
		endDrag,
		moveElement,
		moveSection,
		resume.sections,
	])

	const removeSection = useCallback(() => {
		if (!dragData.sectionId) return
		mRemoveSection.mutate({
			sectionId: dragData.sectionId,
		})
		resume.sections = resume.sections.filter(
			(s) => s.id !== dragData.sectionId
		)
		updateResume(resume)
	}, [dragData.sectionId, mRemoveSection, resume, updateResume])

	const removeElement = useCallback(() => {
		if (!dragData.elementId) return
		mRemoveElement.mutate({
			elementId: dragData.elementId,
		})

		const section = resume.sections.find(
			(s) => s.elements.findIndex((e) => e.id === dragData.elementId) > -1
		)

		if (!section) return

		section.elements = section?.elements.filter(
			(e) => e.id !== dragData.elementId
		)

		updateResume(resume)
	}, [dragData.elementId, mRemoveElement, resume, updateResume])

	const onRemoveClicked = useCallback(() => {
		if (dragData.itemType === DraggableType.SECTION) removeSection()
		else if (dragData.itemType === DraggableType.ELEMENT) removeElement()
	}, [dragData.itemType, removeElement, removeSection])

	return isMobile && dragData.itemSelected ? (
		<div className="fixed right-4 top-1/2 z-50 mt-2 flex flex-col rounded-full border  bg-indigo-700 p-2 pb-0 shadow-lg">
			<ActionButton onClick={onMoveUpClicked}>
				<ChevronUpIcon />
			</ActionButton>
			<ActionButton onClick={onMoveDownClicked}>
				<ChevronDownIcon />
			</ActionButton>
			<ActionButton onClick={onRemoveClicked}>
				<TrashIcon />
			</ActionButton>
		</div>
	) : (
		<></>
	)
}
