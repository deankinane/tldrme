import ProfilePicture from './profile-picture'

describe('ProfilePicture', () => {
	it('should display the profile picture if passed as a prop', () => {
		cy.mount(<ProfilePicture imageData="/fake.jpg" />)
		cy.g('profile-picture-image').should('exist')
		cy.g('profile-picture-default').should('not.exist')
	})

	it('should display the default picture if none passed as a prop', () => {
		cy.mount(<ProfilePicture />)
		cy.g('profile-picture-default').should('exist')
		cy.g('profile-picture-image').should('not.exist')
	})
})
