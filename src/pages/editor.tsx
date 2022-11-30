import Editor from '@/modules/editor/editor'
import { DraggableProvider } from '@/modules/editor/utils/draggableContext'
import type { ResumeModel } from '@/utils/common/types'
import Script from 'next/script'
import React from 'react'
import { prisma } from 'src/server/db/client'

interface Props {
	resumeModel: ResumeModel
}
export default function EditorPage({ resumeModel }: Props) {
	return (
		<>
			<Script src="/DragDropTouch.js" />
			<div className="mx-auto h-full max-w-screen-xl">
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
