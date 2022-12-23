import type { Prisma } from '@prisma/client'

export type ResumeModel = Prisma.ResumeGetPayload<{
	include: {
		sections: {
			include: {
				elements: true
			}
		}
		resumeStyle: true
	}
}>

export type SectionModel = Prisma.SectionGetPayload<{
	include: {
		elements: true
	}
}>
