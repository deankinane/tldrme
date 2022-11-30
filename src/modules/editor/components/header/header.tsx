import React, { useContext } from 'react'
import { ResumeContext } from '../../utils/resumeContext'
import HeaderTitle from './header-title'
import ProfilePicture from './profile-picture'

export default function Header() {
	const { resume } = useContext(ResumeContext)
	return (
		<div className="flex h-52 lg:h-96">
			<div className="flex h-full min-w-fit items-center lg:w-96 lg:min-w-[24rem]">
				<ProfilePicture imageUrl={resume.profilePicUrl || ''} />
			</div>
			<div className="flex-grow pl-8 md:pl-16">
				<HeaderTitle
					resumeId={resume.id}
					title={resume.headerTitle}
					subTitle={resume.headerSubtitle}
				/>
			</div>
		</div>
	)
}
