import { ElementType } from '@prisma/client'
import AddElementButton from './add-element-button'

describe('AddElementButton', () => {
	it('should display element buttons when clicked', () => {
		cy.mount(
			<AddElementButton
				onAddElementClicked={cy.stub()}
				isLoading={false}
			/>
		)
		cy.g('show-options-button').click()
		Object.keys(ElementType).forEach((e) => {
			cy.g(`add-element-button-${e}`).should('exist')
		})
	})
	Object.keys(ElementType).forEach((element) => {
		it(`should trigger callback with '${element}' param when ${element} button clicked`, () => {
			const spy = cy.spy().as('onClick')
			cy.mount(
				<AddElementButton onAddElementClicked={spy} isLoading={false} />
			)
			cy.g('show-options-button').click()
			cy.g(`add-element-button-${element}`).click()
			cy.g('@onClick').should('have.been.calledWith', element)
		})
	})
})
