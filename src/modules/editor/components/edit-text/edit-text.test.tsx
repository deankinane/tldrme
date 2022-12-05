import EditText from './edit-text'

describe('EditText', () => {
	it('should display the text passed to the text prop', () => {
		const initialText = 'TESTABC'
		cy.mount(
			<EditText
				fontStyles=""
				text={initialText}
				onTextChanged={() => {
					return
				}}
			/>
		)

		cy.g('edit-text-p').should('have.text', initialText)
	})

	it('should display the default text if nothing passed to text prop', () => {
		cy.mount(
			<EditText
				fontStyles=""
				onTextChanged={() => {
					return
				}}
			/>
		)
		cy.g('edit-text-p').should('have.text', 'Click to edit')
	})

	it('should apply css classes in fontStyles prop to the p element', () => {
		const fontStyles = 'test-font-styles'
		cy.mount(
			<EditText
				fontStyles={fontStyles}
				onTextChanged={() => {
					return
				}}
			/>
		)

		cy.g('edit-text-p').should('have.class', fontStyles)
	})

	it('should switch to edit mode when user clicks on it', () => {
		cy.mount(
			<EditText
				fontStyles=""
				onTextChanged={() => {
					return
				}}
			/>
		)
		cy.g('edit-text-p').click()
		cy.g('edit-text-input').should('have.focus')
	})

	it('should switch to display mode when user clicks on something else', () => {
		cy.mount(
			<div>
				<EditText
					fontStyles=""
					onTextChanged={() => {
						return
					}}
				/>
				<p data-testid="otherelement">to click on</p>
			</div>
		)

		cy.g('edit-text-p').click()
		cy.g('otherelement').click()
		cy.g('edit-text-input').should('not.exist')
		cy.g('edit-text-p').should('exist')
	})

	it('should trigger callback function when switching back to display mode', () => {
		const initialText = 'initial'
		const callback = cy.spy().as('cb')

		cy.mount(
			<div>
				<EditText
					fontStyles=""
					text={initialText}
					onTextChanged={callback}
				/>
				<p data-testid="otherelement">to click on</p>
			</div>
		)
		cy.g('edit-text-p').click()
		cy.g('otherelement').click()

		cy.g('@cb').should('have.been.calledWith', initialText)
	})

	it('should apply css classes in fontStyles prop to the input element', () => {
		const fontStyles = 'test-font-styles'
		cy.mount(
			<EditText
				fontStyles={fontStyles}
				onTextChanged={() => {
					return
				}}
			/>
		)
		cy.g('edit-text-p').click()
		cy.g('edit-text-input').should('have.class', fontStyles)
	})

	it('should switch back to display mode when Enter key pressed', () => {
		const callback = cy.spy().as('cb')

		cy.mount(<EditText fontStyles="" onTextChanged={callback} />)

		cy.g('edit-text-p').click()
		cy.g('edit-text-input').type('{enter}')

		cy.g('@cb').should('have.been.called')
		cy.g('edit-text-p').should('exist')
	})
})
