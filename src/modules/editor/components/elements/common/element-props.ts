import type { Element } from '@prisma/client'

export interface ElementProps {
	element: Element
	onElementUpdated: (element: Element) => void
}
