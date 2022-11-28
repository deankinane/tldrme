import type { SectionModel } from '@/utils/common/types'

export default function reorderSections(
	sections: SectionModel[],
	startPosition: number,
	newPosition: number
): SectionModel[] {
	newPosition = startPosition < newPosition ? newPosition - 1 : newPosition
	const newOrder = [...sections]
	const sectionMoving = newOrder.splice(startPosition, 1)[0]
	if (sectionMoving) {
		newOrder.splice(newPosition, 0, sectionMoving)
		newOrder.forEach((s, i) => (s.order = i))
	}
	return newOrder
}
