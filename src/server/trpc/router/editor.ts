import { ElementType } from '@prisma/client'
import { z } from 'zod'
import { prisma } from '../../db/client'
import { router, publicProcedure } from '../trpc'

export const editorRouter = router({
	updateResumeTitle: publicProcedure
		.input(
			z.object({
				resumeId: z.string(),
				title: z.string(),
				subTitle: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			await prisma?.resume.update({
				where: {
					id: input.resumeId,
				},
				data: {
					headerTitle: input.title,
					headerSubtitle: input.subTitle,
				},
			})
		}),

	addSection: publicProcedure
		.input(
			z.object({
				resumeId: z.string(),
				columnIndex: z.number(),
				order: z.number(),
			})
		)
		.mutation(async ({ input }) => {
			const newSection = await prisma?.section.create({
				data: {
					columnIndex: input.columnIndex,
					resumeId: input.resumeId,
					order: input.order,
					title: 'New Section',
				},
			})

			return newSection
		}),
	updateSectionTitle: publicProcedure
		.input(
			z.object({
				sectionId: z.string(),
				title: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			await prisma?.section.update({
				where: {
					id: input.sectionId,
				},
				data: {
					title: input.title,
				},
			})
		}),
	reorderSection: publicProcedure
		.input(
			z.array(
				z.object({
					sectionId: z.string(),
					newOrder: z.number(),
				})
			)
		)
		.mutation(async ({ input }) => {
			for (let i = 0; i < input.length; i++) {
				const s = input[i]
				if (s) {
					await prisma?.section.update({
						where: { id: s.sectionId },
						data: { order: s.newOrder },
					})
				}
			}
		}),
	removeSection: publicProcedure
		.input(
			z.object({
				sectionId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			await prisma?.section.delete({
				where: {
					id: input.sectionId,
				},
			})
		}),
	addElement: publicProcedure
		.input(
			z.object({
				sectionId: z.string(),
				order: z.number(),
				type: z.nativeEnum(ElementType),
			})
		)
		.mutation(async ({ input }) => {
			return await prisma?.element.create({
				data: {
					sectionId: input.sectionId,
					order: input.order,
					type: input.type,
					text: 'New Element',
					icon: input.type === 'IconText' ? 'check' : '',
				},
			})
		}),
	updateElement: publicProcedure
		.input(
			z.object({
				elementId: z.string(),
				text: z.string(),
				icon: z.optional(z.string()),
			})
		)
		.mutation(async ({ input }) => {
			await prisma?.element.update({
				where: {
					id: input.elementId,
				},
				data: {
					text: input.text,
					icon: input.icon,
				},
			})
		}),
})
