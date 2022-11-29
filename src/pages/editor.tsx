import Editor from '@/modules/editor/editor'
import type { ResumeModel } from '@/utils/common/types'
import React from 'react'

interface Props {
	resumeModel: ResumeModel
}
export default function EditorPage({ resumeModel }: Props) {
	return <Editor resume={resumeModel} />
}

export async function getServerSideProps() {
	console.log('editor', 'getServerSideProps')
	const resumeModel = await prisma?.resume.findUnique({
		where: {
			id: 'clb2oakir0000ttqkzncmmdqr',
		},
		include: {
			sections: {
				include: {
					elements: true,
				},
			},
		},
	})

	console.log('editor', 'resumeModel', resumeModel)

	return {
		props: { resumeModel },
	}
}
