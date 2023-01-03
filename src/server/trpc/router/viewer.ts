import { z } from 'zod'
import { prisma } from '../../db/client'
import { router, publicProcedure } from '../trpc'

export const viewerRouter = router({
	getResumeBySlug: publicProcedure
		.input(
			z.object({
				slug: z.string(),
			})
		)
		.query(async ({ input }) => {
			return prisma.resume.findFirst({
				where: {
					urlSlug: input.slug,
				},
			})
		}),
})
