import SectionTitle from './section_title'

describe('SectionTitle', () => {
	it('should not be immediately interactive on small screens', () => {
		cy.viewport('iphone-8')
		cy.mount(
			<SectionTitle onTextChanged={cy.stub()} text="Test"></SectionTitle>
		)
		cy.g('section-title-p').should('exist')
		cy.g('edit-text-wrapper').should('not.exist')
	})

	it('should be immediately interactive on larger screens', () => {
		cy.viewport('macbook-15')
		cy.mount(
			<SectionTitle onTextChanged={cy.stub()} text="Test"></SectionTitle>
		)

		cy.g('edit-text-wrapper').should('exist')
		cy.g('section-title-p').should('not.exist')
	})
})
