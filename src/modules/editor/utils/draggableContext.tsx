import type { PropsWithChildren } from 'react'
import { createContext, useCallback, useState } from 'react'

export enum DraggableType {
	SECTION = 'SECTION',
	ELEMENT = 'ELEMENT',
}

export type DraggableData = {
	itemInDrag: boolean
	itemType: DraggableType
	sectionId?: string
	elementId?: string
	itemIndex: number
	columnIndex: number
}

export interface Draggable {
	dragData: DraggableData
	setDragData: (data: DraggableData) => void
	endDrag: () => void
}

const DraggableDataDefault: DraggableData = {
	itemInDrag: false,
	itemType: DraggableType.SECTION,
	itemIndex: 0,
	columnIndex: 0,
}

const DraggableContext = createContext<Draggable>({
	dragData: DraggableDataDefault,
	setDragData: (data: DraggableData) => {
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
		setDraggable(data)
	}, [])

	const endDrag = useCallback(() => {
		setDraggable(DraggableDataDefault)
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
