import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import AddSectionButton from './add_section_button'

describe('AddSectionButton', () => {
	it('should trigger callback function when clicked', async () => {
		const user = userEvent.setup()
		const callback = jest.fn()
		render(<AddSectionButton onAddSectionClicked={callback} />)

		await user.click(screen.getByTestId('add-section-button'))

		expect(callback).toHaveBeenCalled()
	})
})
