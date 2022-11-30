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

			expect(newOrder[0]?.order).to.eq(0)
			expect(newOrder[0]?.title).to.eq('Section 3')
			expect(newOrder[1]?.order).to.eq(1)
			expect(newOrder[1]?.title).to.eq('Section 0')
			expect(newOrder[2]?.order).to.eq(2)
			expect(newOrder[2]?.title).to.eq('Section 1')
			expect(newOrder[3]?.order).to.eq(3)
			expect(newOrder[3]?.title).to.eq('Section 2')
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

			expect(newOrder[0]?.order).to.eq(0)
			expect(newOrder[0]?.title).to.eq('Section 1')
			expect(newOrder[1]?.order).to.eq(1)
			expect(newOrder[1]?.title).to.eq('Section 2')
			expect(newOrder[2]?.order).to.eq(2)
			expect(newOrder[2]?.title).to.eq('Section 3')
			expect(newOrder[3]?.order).to.eq(3)
			expect(newOrder[3]?.title).to.eq('Section 0')
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

			expect(newOrder[0]?.order).to.eq(0)
			expect(newOrder[0]?.title).to.eq('Section 1')
			expect(newOrder[1]?.order).to.eq(1)
			expect(newOrder[1]?.title).to.eq('Section 0')
			expect(newOrder[2]?.order).to.eq(2)
			expect(newOrder[2]?.title).to.eq('Section 2')
			expect(newOrder[3]?.order).to.eq(3)
			expect(newOrder[3]?.title).to.eq('Section 3')
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

			expect(newOrder[0]?.order).to.eq(0)
			expect(newOrder[0]?.title).to.eq('Section 0')
			expect(newOrder[1]?.order).to.eq(1)
			expect(newOrder[1]?.title).to.eq('Section 1')
			expect(newOrder[2]?.order).to.eq(2)
			expect(newOrder[2]?.title).to.eq('Section 3')
			expect(newOrder[3]?.order).to.eq(3)
			expect(newOrder[3]?.title).to.eq('Section 2')
		})
	})
})
