import AppHeader from '@/modules/app-header/components/app-header'
import Editor from '@/modules/editor/editor'
import { DraggableProvider } from '@/modules/editor/utils/draggableContext'
import type { ResumeModel } from '@/utils/common/types'
import { GetServerSideProps } from 'next'
import React from 'react'
import { getServerAuthSession } from 'src/server/common/get-server-auth-session'
import { prisma } from 'src/server/db/client'
interface Props {
	resumeModel: ResumeModel
}
export default function EditorPage({ resumeModel }: Props) {
	return (
		<>
			<AppHeader></AppHeader>
			<div className="fixed top-16 bottom-0 left-0 right-0 mx-auto max-w-screen-2xl">
				<DraggableProvider>
					<Editor resume={resumeModel} />
				</DraggableProvider>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getServerAuthSession(context)
	if (!session || !session.user) {
		return {
			redirect: {
				destination: "/",
				permanent: false
			}
		}
	}

	let resumeModel = await prisma?.resume.findFirst({
		where: {
			userId: session.user.id
		},
		include: {
			sections: {
				include: {
					elements: true,
				},
			},
		},
	})

	if (!resumeModel) {
		await prisma?.resume.create({
			data: {
				userId: session.user.id,
				headerTitle: 'Your Name Here',
				headerSubtitle: 'Your job description goes here',
			}
		})


		resumeModel = await prisma?.resume.findFirst({
			where: {
				userId: session.user.id
			},
			include: {
				sections: {
					include: {
						elements: true,
					},
				},
			},
		})

	}

	return {
		props: { resumeModel },
	}
}
