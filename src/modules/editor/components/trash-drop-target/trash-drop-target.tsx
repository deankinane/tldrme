import { trpc } from '@/utils/trpc'
import React, { useCallback, useContext, useState } from 'react'
import type { DraggableData } from '../../utils/draggableContext'
import { DraggableType } from '../../utils/draggableContext'
import { DraggableContext } from '../../utils/draggableContext'
import { ResumeContext } from '../../utils/resumeContext'
import { isMobile } from 'react-device-detect'

export default function TrashDropTarget() {
	const [dragHover, setDragHover] = useState(false)
	const { dragData, endDrag } = useContext(DraggableContext)
	const { resume, updateResume } = useContext(ResumeContext)

	const mRemoveSection = trpc.editor.removeSection.useMutation()
	const mRemoveElement = trpc.editor.removeElement.useMutation()

	const onDragOver = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
		ev.preventDefault()
	}, [])

	const onDragEnter = useCallback(() => {
		setDragHover(true)
	}, [])

	const onDragLeave = useCallback(() => {
		setDragHover(false)
	}, [])

	const removeSection = useCallback(
		(itemId: string) => {
			resume.sections = resume.sections.filter((s) => s.id !== itemId)
			updateResume(resume)
			mRemoveSection.mutate({
				sectionId: itemId,
			})
		},
		[mRemoveSection, resume, updateResume]
	)

	const removeElement = useCallback(
		(sectionId: string, elementId: string) => {
			const s = resume.sections.find((x) => x.id === sectionId)
			if (s) {
				s.elements = s.elements.filter((e) => e.id !== elementId)
			}
			updateResume(resume)
			mRemoveElement.mutate({
				elementId: elementId,
			})
		},
		[mRemoveElement, resume, updateResume]
	)

	const onTrashDropped = useCallback(
		(data: DraggableData) => {
			if (data.itemType === DraggableType.SECTION && data.sectionId)
				removeSection(data.sectionId)
			else if (
				data.itemType === DraggableType.ELEMENT &&
				data.sectionId &&
				data.elementId
			)
				removeElement(data.sectionId, data.elementId)
		},
		[removeSection, removeElement]
	)

	const onDrop = useCallback(
		(ev: React.DragEvent<HTMLDivElement>) => {
			ev.preventDefault()
			onTrashDropped(dragData)
			endDrag()
		},
		[onTrashDropped, dragData, endDrag]
	)

	return isMobile ? (
		<></>
	) : (
		<div
			onDragEnter={onDragEnter}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			onDragOver={onDragOver}
			className={`${dragData.itemSelected ? '!h-16 !opacity-100' : ''} ${
				dragHover ? 'bg-red-300' : ''
			} fixed bottom-8 left-[calc(50%-4.5rem)] my-0 mx-auto mt-40 h-0 w-36 overflow-hidden rounded-md border border-red-700 opacity-0 transition-all`}
		></div>
	)
}
