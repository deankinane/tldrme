import AddSectionButton from './add_section_button'

describe('AddSectionButton', () => {
	it('should trigger callback function when clicked', () => {
		const callback = cy.spy().as('cb')
		cy.mount(
			<AddSectionButton
				onAddSectionClicked={callback}
				isLoading={false}
			/>
		)
		cy.g('add-section-button').click()
		cy.g('@cb').should('have.been.called')
	})

	it('should display spinner when loading', () => {
		cy.mount(
			<AddSectionButton
				onAddSectionClicked={cy.stub()}
				isLoading={true}
			/>
		)
		cy.g('spinner').should('exist')
	})

	it('should display icon when not loading', () => {
		cy.mount(
			<AddSectionButton
				onAddSectionClicked={cy.stub()}
				isLoading={false}
			/>
		)
		cy.g('icon').should('exist')
	})
})
