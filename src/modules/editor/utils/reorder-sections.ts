export interface IOrderable {
	order: number
}

export default function reorderSections<T extends IOrderable>(
	sections: T[],
	startPosition: number,
	newPosition: number
): IOrderable[] {
	newPosition = newPosition < startPosition ? newPosition + 1 : newPosition
	const newOrder = [...sections]
	const sectionMoving = newOrder.splice(startPosition, 1)[0]
	if (sectionMoving) {
		newOrder.splice(newPosition, 0, sectionMoving)
		newOrder.forEach((s, i) => (s.order = i))
	}
	return newOrder
}
