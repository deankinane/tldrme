import React from 'react'
import HeaderTitle from './header-title'
import ProfilePicture from './profile-picture'
interface Props {
	fullName: string
	jobTitle: string
	profilePicUrl?: string
}

export default function Header({ fullName, jobTitle, profilePicUrl }: Props) {
	return (
		<div className="flex h-52 lg:h-96">
			<div className="flex h-full w-28 min-w-fit items-center lg:w-96 lg:min-w-[24rem]">
				<ProfilePicture imageUrl={profilePicUrl} />
				{/* <ProfilePicture /> */}
			</div>
			<div className="flex-grow pl-16">
				<HeaderTitle fullName={fullName} jobTitle={jobTitle} />
			</div>
		</div>
	)
}
