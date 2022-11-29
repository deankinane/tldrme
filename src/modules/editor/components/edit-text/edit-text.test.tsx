import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import EditText from './edit-text'

describe('EditText', () => {
	it('should display the text passed to the text prop', () => {
		const intialText = 'TESTABC'
		render(
			<EditText
				fontStyles=""
				text={intialText}
				onTextChanged={() => {
					return
				}}
			/>
		)
		const p = screen.getByTestId('edit-text-p')
		expect(p.textContent).toBe(intialText)
	})

	it('should display the default text if nothing passed to text prop', () => {
		render(
			<EditText
				fontStyles=""
				onTextChanged={() => {
					return
				}}
			/>
		)
		const p = screen.getByTestId('edit-text-p')
		expect(p.textContent).toBe('Click to edit')
	})

	it('should apply css classes in fontStyles prop to the p element', () => {
		const fontStyles = 'test-font-styles'
		render(
			<EditText
				fontStyles={fontStyles}
				onTextChanged={() => {
					return
				}}
			/>
		)
		const p = screen.getByTestId('edit-text-p')
		expect(p.getAttribute('class')).toContain(fontStyles)
	})

	it('should switch to edit mode when user clicks on it', async () => {
		const user = userEvent.setup()
		render(
			<EditText
				fontStyles=""
				onTextChanged={() => {
					return
				}}
			/>
		)

		await user.click(screen.getByTestId('edit-text-p'))
		const input = screen.getByTestId('edit-text-input')
		expect(input).toHaveFocus()
	})

	it('should switch to display mode when user clicks on something else', async () => {
		const user = userEvent.setup()
		render(
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
		await user.click(screen.getByTestId('edit-text-p'))
		const input = screen.getByTestId('edit-text-input')
		await user.click(screen.getByTestId('otherelement'))

		const p = screen.getByTestId('edit-text-p')
		expect(p).toBeInTheDocument()
		expect(input).not.toBeInTheDocument()
	})

	it('should trigger callback function when switching back to display mode', async () => {
		const user = userEvent.setup()
		const initialText = 'initial'
		const callback = jest.fn((text: string) => text)

		render(
			<div>
				<EditText
					fontStyles=""
					text={initialText}
					onTextChanged={callback}
				/>
				<p data-testid="otherelement">to click on</p>
			</div>
		)
		await user.click(screen.getByTestId('edit-text-p'))
		await user.click(screen.getByTestId('otherelement'))
		expect(callback).toHaveBeenCalled()
		expect(callback.mock.results[0]?.value).toBe(initialText)
	})

	it('should apply css classes in fontStyles prop to the input element', async () => {
		const user = userEvent.setup()
		const fontStyles = 'test-font-styles'
		render(
			<EditText
				fontStyles={fontStyles}
				onTextChanged={() => {
					return
				}}
			/>
		)
		await user.click(screen.getByTestId('edit-text-p'))
		const input = screen.getByTestId('edit-text-input')
		expect(input.getAttribute('class')).toContain(fontStyles)
	})

	it('should switch back to display mode when Enter key pressed', async () => {
		const user = userEvent.setup()
		const callback = jest.fn((text: string) => text)

		render(<EditText fontStyles="" onTextChanged={callback} />)

		await user.click(screen.getByTestId('edit-text-p'))
		await user.type(screen.getByTestId('edit-text-input'), '{enter}')
		expect(callback).toHaveBeenCalled()
		expect(screen.getByTestId('edit-text-p')).toBeInTheDocument()
	})
})
