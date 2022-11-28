import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProfilePicture from './profile-picture'

describe('ProfilePicture', () => {
	it('should display the profile picture if passed as a prop', () => {
		render(<ProfilePicture imageUrl="/fake.jpg" />)

		const image = screen.getByTestId('profile-picture-image')
		expect(image).toBeInTheDocument()
	})

	it('should display the default picture if none passed as a prop', () => {
		render(<ProfilePicture />)

		const image = screen.getByTestId('profile-picture-default')
		expect(image).toBeInTheDocument()
	})
})
