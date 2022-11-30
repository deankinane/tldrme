import AppHeader from '@/modules/app-header/components/app-header'
import Editor from '@/modules/editor/editor'
import { DraggableProvider } from '@/modules/editor/utils/draggableContext'
import type { ResumeModel } from '@/utils/common/types'
import React from 'react'
import { prisma } from 'src/server/db/client'
interface Props {
	resumeModel: ResumeModel
}
export default function EditorPage({ resumeModel }: Props) {
	return (
		<>
			<AppHeader></AppHeader>
			<div className="fixed top-16 bottom-0 left-0 right-0 mx-auto max-w-screen-xl md:static md:h-full md:pt-16">
				<DraggableProvider>
					<Editor resume={resumeModel} />
				</DraggableProvider>
			</div>
		</>
	)
}

export async function getServerSideProps() {
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

	return {
		props: { resumeModel },
	}
}
