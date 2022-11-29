import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import AddElementButton from './add-element-button'

describe('AddElementButton', () => {
	it('should trigger callback function when clicked', async () => {
		const user = userEvent.setup()
		const callback = jest.fn()
		render(<AddElementButton onAddElementClicked={callback} />)

		await user.click(screen.getByTestId('add-element-button'))

		expect(callback).toHaveBeenCalled()
	})
})
