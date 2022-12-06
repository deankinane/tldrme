import { withDropTarget } from '@/modules/common/components/withDropTarget'
import { trpc } from '@/utils/trpc'
import type { Element } from '@prisma/client'
import { ElementType } from '@prisma/client'
import { useCallback, useContext, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { DraggableContext, DraggableType } from '../../utils/draggableContext'
import BulletTextElement from './bullet-text/bullet-text'
import IconTextElement from './icon-text/icon-text'
import SubTitleElement from './subtitle-element/subtitle-element'
import TextElement from './text/text'

interface Props {
	element: Element
	onElementUpdated: (element: Element) => void
	index: number
}
function BaseElement({ element, onElementUpdated, index }: Props) {
	const { setDragData, endDrag } = useContext(DraggableContext)
	const [dragged, setDragged] = useState(false)

	const mUpdateElement = trpc.editor.updateElement.useMutation()

	const updateElement = useCallback(
		(el: Element) => {
			mUpdateElement.mutate({
				elementId: el.id,
				text: el.text,
			})

			onElementUpdated(el)
		},
		[mUpdateElement, onElementUpdated]
	)

	const getDragData = useCallback(() => {
		return {
			itemSelected: true,
			itemType: DraggableType.ELEMENT,
			elementId: element.id,
			sectionId: element.sectionId,
			columnIndex: 0,
			itemIndex: index,
		}
	}, [element.id, element.sectionId, index])

	const dragStart = useCallback(() => {
		setDragData(getDragData())
		setDragged(true)
	}, [getDragData, setDragData])

	const dragEnd = useCallback(() => {
		setDragged(false)
		endDrag()
	}, [endDrag])

	const onSelectElement = useCallback(() => {
		if (isMobile) setDragData(getDragData())
	}, [getDragData, setDragData])

	const onElementBlur = useCallback(() => {
		setTimeout(() => endDrag(element.id), 200)
	}, [element.id, endDrag])

	return (
		<div
			draggable
			onDragStart={dragStart}
			onDragEnd={dragEnd}
			className={`${dragged ? 'opacity-60' : ''}`}
			onClick={onSelectElement}
		>
			{element.type === ElementType.SubTitle ? (
				<SubTitleElement
					element={element}
					onElementUpdated={updateElement}
					onBlur={onElementBlur}
				/>
			) : (
				<></>
			)}

			{element.type === ElementType.IconText ? (
				<IconTextElement
					element={element}
					onElementUpdated={updateElement}
					onBlur={onElementBlur}
				/>
			) : (
				<></>
			)}

			{element.type === ElementType.BulletText ? (
				<BulletTextElement
					element={element}
					onElementUpdated={updateElement}
					onBlur={onElementBlur}
				/>
			) : (
				<></>
			)}

			{element.type === ElementType.Text ? (
				<TextElement
					element={element}
					onElementUpdated={updateElement}
					onBlur={onElementBlur}
				/>
			) : (
				<></>
			)}
		</div>
	)
}

export default withDropTarget(BaseElement)
