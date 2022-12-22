import { ColorPicker } from './color-picker'

describe('ColorPicker', () => {
	it('should trigger callback when color selected', () => {
		const callback = cy.spy().as('cb')
		cy.mount(<ColorPicker onColorChanged={callback} />)

		cy.g('@cb').should('have.been.called')
	})
})
