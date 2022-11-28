import '@testing-library/jest-dom/extend-expect'
import { type SectionModel } from '@/utils/common/types'
import reorderSections from '@/modules/editor/utils/reorder-sections'

describe('Editor', () => {
	describe('reorderSections', () => {
		it('should reorder the sections correctly when moving bottom to top', () => {
			const sections = new Array<SectionModel>()
			for (let i = 0; i < 4; i++) {
				sections.push({
					columnIndex: 1,
					elements: [],
					id: 'item' + i,
					order: i,
					resumeId: 'resume',
					title: 'Section ' + i,
				})
			}

			const newOrder = reorderSections(sections, 3, 0)

			expect(newOrder[0]?.order).toBe(0)
			expect(newOrder[0]?.title).toBe('Section 3')
			expect(newOrder[1]?.order).toBe(1)
			expect(newOrder[1]?.title).toBe('Section 0')
			expect(newOrder[2]?.order).toBe(2)
			expect(newOrder[2]?.title).toBe('Section 1')
			expect(newOrder[3]?.order).toBe(3)
			expect(newOrder[3]?.title).toBe('Section 2')
		})

		it('should reorder the sections correctly when moving top to bottom', () => {
			const sections = new Array<SectionModel>()
			for (let i = 0; i < 4; i++) {
				sections.push({
					columnIndex: 1,
					elements: [],
					id: 'item' + i,
					order: i,
					resumeId: 'resume',
					title: 'Section ' + i,
				})
			}

			const newOrder = reorderSections(sections, 0, 4)

			expect(newOrder[0]?.order).toBe(0)
			expect(newOrder[0]?.title).toBe('Section 1')
			expect(newOrder[1]?.order).toBe(1)
			expect(newOrder[1]?.title).toBe('Section 2')
			expect(newOrder[2]?.order).toBe(2)
			expect(newOrder[2]?.title).toBe('Section 3')
			expect(newOrder[3]?.order).toBe(3)
			expect(newOrder[3]?.title).toBe('Section 0')
		})

		it('should reorder the sections correctly when moving an item down', () => {
			const sections = new Array<SectionModel>()
			for (let i = 0; i < 4; i++) {
				sections.push({
					columnIndex: 1,
					elements: [],
					id: 'item' + i,
					order: i,
					resumeId: 'resume',
					title: 'Section ' + i,
				})
			}

			const newOrder = reorderSections(sections, 0, 2)

			expect(newOrder[0]?.order).toBe(0)
			expect(newOrder[0]?.title).toBe('Section 1')
			expect(newOrder[1]?.order).toBe(1)
			expect(newOrder[1]?.title).toBe('Section 0')
			expect(newOrder[2]?.order).toBe(2)
			expect(newOrder[2]?.title).toBe('Section 2')
			expect(newOrder[3]?.order).toBe(3)
			expect(newOrder[3]?.title).toBe('Section 3')
		})

		it('should reorder the sections correctly when moving an item up', () => {
			const sections = new Array<SectionModel>()
			for (let i = 0; i < 4; i++) {
				sections.push({
					columnIndex: 1,
					elements: [],
					id: 'item' + i,
					order: i,
					resumeId: 'resume',
					title: 'Section ' + i,
				})
			}

			const newOrder = reorderSections(sections, 3, 2)

			expect(newOrder[0]?.order).toBe(0)
			expect(newOrder[0]?.title).toBe('Section 0')
			expect(newOrder[1]?.order).toBe(1)
			expect(newOrder[1]?.title).toBe('Section 1')
			expect(newOrder[2]?.order).toBe(2)
			expect(newOrder[2]?.title).toBe('Section 3')
			expect(newOrder[3]?.order).toBe(3)
			expect(newOrder[3]?.title).toBe('Section 2')
		})
	})
})
