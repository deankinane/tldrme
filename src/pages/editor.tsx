import Editor from '@/modules/editor/editor'
import type { ResumeModel } from '@/utils/common/types'
import React from 'react'

interface Props {
	resumeModel: ResumeModel
}
export default function EditorPage({ resumeModel }: Props) {
	return <Editor resumeModel={resumeModel} />
}

export async function getServerSideProps() {
	const resumeModel: ResumeModel = {
		id: 'testresume',
		headerTitle: 'Your Name Here',
		headerSubtitle: 'Your Job Title Here',
		profilePicUrl: '',
		sections: [],
	}
	return {
		props: { resumeModel },
	}
}
