import type { PropsWithChildren } from 'react'
import { createContext, useCallback, useState } from 'react'

export enum DraggableType {
	SECTION = 'SECTION',
	ELEMENT = 'ELEMENT',
}

export type DraggableData = {
	itemSelected: boolean
	itemType: DraggableType
	sectionId?: string
	elementId?: string
	itemIndex: number
	columnIndex: number
}

export interface Draggable {
	dragData: DraggableData
	setDragData: (data: DraggableData) => void
	endDrag: (itemId?: string) => void
}

const DraggableDataDefault: DraggableData = {
	itemSelected: false,
	itemType: DraggableType.SECTION,
	itemIndex: 0,
	columnIndex: 0,
}

const DraggableContext = createContext<Draggable>({
	dragData: DraggableDataDefault,
	setDragData: () => {
		return
	},
	endDrag: () => {
		return
	},
})

import React from 'react'

function DraggableProvider({ children }: PropsWithChildren) {
	const [draggable, setDraggable] =
		useState<DraggableData>(DraggableDataDefault)

	const setData = useCallback((data: DraggableData) => {
		console.log('set', data)
		setDraggable((d) => {
			return {
				...d,
				...data,
				elementId:
					data.itemType === DraggableType.ELEMENT
						? data.elementId
						: '',
			}
		})
	}, [])

	const endDrag = useCallback((itemId?: string) => {
		setDraggable((d) => {
			if (
				!itemId ||
				itemId === d.elementId ||
				(d.elementId === '' && itemId === d.sectionId)
			) {
				return {
					...d,
					itemSelected: false,
				}
			}

			return d
		})
	}, [])

	const draggableState: Draggable = {
		dragData: draggable,
		setDragData: setData,
		endDrag,
	}
	return (
		<DraggableContext.Provider value={draggableState}>
			{children}
		</DraggableContext.Provider>
	)
}

export { DraggableDataDefault, DraggableProvider, DraggableContext }
