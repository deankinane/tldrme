import { withTrpcMock } from '@/utils/test-helpers/trpc-wrapper'
import type { Element } from '@prisma/client'
import { ElementType } from '@prisma/client'
import BaseElement from './base-element'

const Wrapped = withTrpcMock(BaseElement)

describe('BaseElement', () => {
	Object.keys(ElementType).forEach((element) => {
		it(`should render the ${element} component for the ${element} type`, () => {
			const el: Element = {
				id: 'test',
				icon: '',
				type: element as ElementType,
				order: 0,
				sectionId: 'test',
				text: 'test',
			}

			cy.mount(
				<Wrapped
					pageProps={{}}
					element={el}
					onElementUpdated={cy.stub()}
					index={0}
					isValidSource={() => {
						return true
					}}
					onItemDropped={() => {
						return
					}}
				/>
			)

			cy.g(`element-${element}`).should('exist')
		})
	})
})
