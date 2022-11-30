import AddElementButton from './add-element-button'

describe('AddElementButton', () => {
	it('should trigger callback function when clicked', () => {
		const spy = cy.spy().as('onClick')
		cy.mount(<AddElementButton onAddElementClicked={spy} />)
		cy.g('add-element-button').click()
		cy.g('@onClick').should('have.been.called')
	})
})
