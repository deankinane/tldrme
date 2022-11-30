import AddSectionButton from './add_section_button'

describe('AddSectionButton', () => {
	it('should trigger callback function when clicked', async () => {
		const callback = cy.spy().as('cb')
		cy.mount(<AddSectionButton onAddSectionClicked={callback} />)
		cy.g('add-section-button').click()
		cy.g('@cb').should('have.been.called')
	})
})
