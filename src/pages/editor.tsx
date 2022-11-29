import Editor from '@/modules/editor/editor'
import type { ResumeModel } from '@/utils/common/types'
import React from 'react'
import { prisma } from 'src/server/db/client'

interface Props {
	resumeModel: ResumeModel
}
export default function EditorPage({ resumeModel }: Props) {
	return (
		<div className="mx-auto h-full max-w-screen-xl">
			<Editor resume={resumeModel} />
		</div>
	)
}

export async function getServerSideProps() {
	console.log('editor', 'getServerSideProps')
	const resumeModel = await prisma?.resume.findUnique({
		where: {
			id: 'clb2tj0100000ttyopqsmvlu6',
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
