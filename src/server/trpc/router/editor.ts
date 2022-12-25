import { ElementType } from '@prisma/client'
import { z } from 'zod'
import { prisma } from '../../db/client'
import { router, publicProcedure, protectedProcedure } from '../trpc'

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
	updateProfilePicture: publicProcedure
		.input(
			z.object({
				resumeId: z.string(),
				base64: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			await prisma?.resume.update({
				where: {
					id: input.resumeId,
				},
				data: {
					profilePicUrl: input.base64,
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
					icon: input.type === 'IconText' ? 'Documenticon' : '',
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
	removeElement: publicProcedure
		.input(
			z.object({
				elementId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			await prisma?.element.delete({
				where: {
					id: input.elementId,
				},
			})
		}),
	reorderElement: publicProcedure
		.input(
			z.array(
				z.object({
					elementId: z.string(),
					newOrder: z.number(),
				})
			)
		)
		.mutation(async ({ input }) => {
			for (let i = 0; i < input.length; i++) {
				const s = input[i]
				if (s) {
					await prisma?.element.update({
						where: { id: s.elementId },
						data: { order: s.newOrder },
					})
				}
			}
		}),
	updateResumeStyle: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				headerTitleColor: z.number(),
				headerSubtitleColor: z.number(),
				sectionTitleColor: z.number(),
				elementTextColor: z.number(),
				bulletColor: z.number(),
				iconColor: z.number(),
			})
		)
		.mutation(async ({ input }) => {
			await prisma.resumeStyle.update({
				where: {
					id: input.id,
				},
				data: {
					headerTitleColor: input.headerTitleColor,
					headerSubtitleColor: input.headerSubtitleColor,
					sectionTitleColor: input.sectionTitleColor,
					elementTextColor: input.elementTextColor,
					bulletColor: input.bulletColor,
					iconColor: input.iconColor,
				},
			})
		}),
})
