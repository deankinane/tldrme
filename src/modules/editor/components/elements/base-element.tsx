import { withDropTarget } from '@/modules/common/components/withDropTarget'
import { trpc } from '@/utils/trpc'
import type { Element } from '@prisma/client'
import { useCallback, useContext, useState } from 'react'
import { DraggableContext, DraggableType } from '../../utils/draggableContext'
import IconTextElement from './icon-text/icon-text'
import SubTitleElement from './subtitle-element/subtitle-element'

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

	const dragStart = useCallback(() => {
		setDragData({
			itemInDrag: true,
			itemType: DraggableType.ELEMENT,
			elementId: element.id,
			sectionId: element.sectionId,
			columnIndex: 0,
			itemIndex: index,
		})
		setDragged(true)
	}, [element.id, element.sectionId, index, setDragData])

	const dragEnd = useCallback(() => {
		setDragged(false)
		endDrag()
	}, [endDrag])

	return (
		<div
			draggable
			onDragStart={dragStart}
			onDragEnd={dragEnd}
			className={`${dragged ? 'opacity-60' : ''}`}
		>
			{element.type === 'SubTitle' ? (
				<SubTitleElement
					element={element}
					onElementUpdated={updateElement}
				/>
			) : (
				<></>
			)}

			{element.type === 'IconText' ? (
				<IconTextElement
					element={element}
					onElementUpdated={updateElement}
				/>
			) : (
				<></>
			)}
		</div>
	)
}

export default withDropTarget(BaseElement)
