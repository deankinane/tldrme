import React, { useContext } from 'react'
import { ResumeContext } from '../../utils/resumeContext'
import HeaderTitle from './header-title'
import ProfilePicture from './profile-picture'

export default function Header() {
	const { resume } = useContext(ResumeContext)
	return (
		<div className="flex h-36 px-8 shadow-sm md:px-0 md:shadow-none lg:h-96">
			<div className="git flex h-full min-w-fit items-center md:w-80 lg:w-96 lg:min-w-[24rem]">
				<ProfilePicture imageData={resume.profilePicUrl || ''} />
			</div>
			<div className="flex-grow pl-4 md:pl-12">
				<HeaderTitle
					resumeId={resume.id}
					title={resume.headerTitle}
					subTitle={resume.headerSubtitle}
				/>
			</div>
		</div>
	)
}
