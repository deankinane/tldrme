import type { ResumeModel } from '@/utils/common/types'
import React from 'react'
import EditorColumn from './components/editor-column/editor-column'
import HeaderTitle from './components/header-title/header-title'
import ProfilePicture from './components/profile-picture/profile-picture'

interface Props {
	resume: ResumeModel
}
export default function Editor({ resume }: Props) {
	return (
		<div className="min-h-full pl-16 pr-16 shadow-lg">
			<div className="flex h-52 lg:h-96">
				<div className="flex h-full w-28 min-w-fit items-center lg:w-96 lg:min-w-[24rem]">
					<ProfilePicture imageUrl={resume.profilePicUrl || ''} />
					{/* <ProfilePicture /> */}
				</div>
				<div className="flex-grow pl-16">
					<HeaderTitle
						resumeId={resume.id}
						title={resume.headerTitle}
						subTitle={resume.headerSubtitle}
					/>
				</div>
			</div>
			<div className="flex flex-col lg:flex-row">
				<div className="w-full lg:w-96">
					<EditorColumn
						resumeId={resume.id}
						columnIndex={1}
						sections={resume.sections.filter(
							(s) => s.columnIndex === 1
						)}
					/>
				</div>
				<div className="w-full lg:w-auto lg:flex-grow lg:pl-16">
					<EditorColumn
						resumeId={resume.id}
						columnIndex={2}
						sections={resume.sections.filter(
							(s) => s.columnIndex === 2
						)}
					/>
				</div>
			</div>
		</div>
	)
}
