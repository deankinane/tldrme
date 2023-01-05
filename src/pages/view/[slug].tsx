import Editor from '@/modules/editor/editor'
import type { ResumeModel } from '@/utils/common/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useState } from 'react'
import { prisma } from 'src/server/db/client'
interface Props {
	resumeModel: ResumeModel
}
export default function ViewerPage({ resumeModel }: Props) {
	const [showSideMenu, setShowSideMenu] = useState(false)
	return (
		<>
			<div className="fixed top-16 bottom-0 left-0 right-0 bg-white md:overflow-y-auto xl:top-0">
				<div className="fixed top-16 bottom-0 left-0 right-0 mx-auto max-w-screen-2xl md:static xl:top-0">
					{resumeModel.headerTitle}
				</div>
			</div>
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	let slug = 'xxx'
	if (params && params.slug) slug = params.slug as string

	let resumeModel = await prisma?.resume.findFirst({
		where: {
			urlSlug: slug,
		},
		include: {
			sections: {
				include: {
					elements: true,
				},
			},
			resumeStyle: true,
		},
	})

	if (!resumeModel) {
	}

	return {
		props: { resumeModel },
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	let slugs = await prisma?.resume.findMany({
		where: {
			NOT: {
				urlSlug: {
					equals: null,
				},
			},
		},
		select: {
			urlSlug: true,
		},
	})

	const paths = slugs.map((s) => ({
		params: {
			slug: s.urlSlug === null ? '' : s.urlSlug,
		},
	}))
	return { paths, fallback: false }
}
