import type { HTMLAttributes, PropsWithChildren } from 'react'
import { createContext, useCallback, useState } from 'react'

export type DraggableData = {
	itemId: string
	itemIndex: number
	columnIndex: number
}

export interface Draggable {
	dragData: DraggableData
	setDragData: (data: DraggableData) => void
}

const DraggableDataDefault: DraggableData = {
	itemId: '',
	itemIndex: 0,
	columnIndex: 0,
}
const DraggableDefault: Draggable = {
	dragData: DraggableDataDefault,
	setDragData: (data: DraggableData) => {
		return
	},
}
const DraggableContext = createContext<Draggable>(DraggableDefault)

import React from 'react'

function DraggableProvider({ children }: PropsWithChildren) {
	const [draggable, setDraggable] =
		useState<DraggableData>(DraggableDataDefault)

	const setData = useCallback((data: DraggableData) => {
		setDraggable(data)
	}, [])

	const draggableState: Draggable = {
		dragData: draggable,
		setDragData: setData,
	}
	return (
		<DraggableContext.Provider value={draggableState}>
			{children}
		</DraggableContext.Provider>
	)
}

export { DraggableDataDefault, DraggableProvider, DraggableContext }
