import type { Element, ResumeStyle } from '@prisma/client'

export interface ElementProps {
	element: Element
	styles: ResumeStyle
	onElementUpdated: (element: Element) => void
	onBlur: () => void
}
