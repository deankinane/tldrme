import { ElementType } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'

export const editorRouter = router({
	updateResumeTitle: protectedProcedure
		.input(
			z.object({
				resumeId: z.string(),
				title: z.string(),
				subTitle: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.resume.update({
				where: {
					id: input.resumeId,
				},
				data: {
					headerTitle: input.title,
					headerSubtitle: input.subTitle,
				},
			})
		}),
	updateProfilePicture: protectedProcedure
		.input(
			z.object({
				resumeId: z.string(),
				base64: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.resume.update({
				where: {
					id: input.resumeId,
				},
				data: {
					profilePicUrl: input.base64,
				},
			})
		}),
	addSection: protectedProcedure
		.input(
			z.object({
				resumeId: z.string(),
				columnIndex: z.number(),
				order: z.number(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.section.create({
				data: {
					columnIndex: input.columnIndex,
					resumeId: input.resumeId,
					order: input.order,
					title: 'New Section',
				},
			})
		}),
	updateSectionTitle: protectedProcedure
		.input(
			z.object({
				sectionId: z.string(),
				title: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.section.update({
				where: {
					id: input.sectionId,
				},
				data: {
					title: input.title,
				},
			})
		}),
	reorderSection: protectedProcedure
		.input(
			z.array(
				z.object({
					sectionId: z.string(),
					newOrder: z.number(),
				})
			)
		)
		.mutation(async ({ ctx, input }) => {
			for (let i = 0; i < input.length; i++) {
				const s = input[i]
				if (s) {
					await ctx.prisma.section.update({
						where: { id: s.sectionId },
						data: { order: s.newOrder },
					})
				}
			}
		}),
	removeSection: protectedProcedure
		.input(
			z.object({
				sectionId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.section.delete({
				where: {
					id: input.sectionId,
				},
			})
		}),
	addElement: protectedProcedure
		.input(
			z.object({
				sectionId: z.string(),
				order: z.number(),
				type: z.nativeEnum(ElementType),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.element.create({
				data: {
					sectionId: input.sectionId,
					order: input.order,
					type: input.type,
					text: 'New Element',
					icon: input.type === 'IconText' ? 'FolderIcon' : '',
				},
			})
		}),
	updateElement: protectedProcedure
		.input(
			z.object({
				elementId: z.string(),
				text: z.string(),
				icon: z.optional(z.string()),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.element.update({
				where: {
					id: input.elementId,
				},
				data: {
					text: input.text,
					icon: input.icon,
				},
			})
		}),
	removeElement: protectedProcedure
		.input(
			z.object({
				elementId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.element.delete({
				where: {
					id: input.elementId,
				},
			})
		}),
	reorderElement: protectedProcedure
		.input(
			z.array(
				z.object({
					elementId: z.string(),
					newOrder: z.number(),
				})
			)
		)
		.mutation(async ({ ctx, input }) => {
			for (let i = 0; i < input.length; i++) {
				const s = input[i]
				if (s) {
					await ctx.prisma.element.update({
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
				sectionSubtitleColor: z.number(),
				infoTextColor: z.number(),
				elementTextColor: z.number(),
				bulletColor: z.number(),
				iconColor: z.number(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.resumeStyle.update({
				where: {
					id: input.id,
				},
				data: {
					headerTitleColor: input.headerTitleColor,
					headerSubtitleColor: input.headerSubtitleColor,
					sectionTitleColor: input.sectionTitleColor,
					sectionSubtitleColor: input.sectionSubtitleColor,
					infoTextColor: input.infoTextColor,
					elementTextColor: input.elementTextColor,
					bulletColor: input.bulletColor,
					iconColor: input.iconColor,
				},
			})
		}),
	updateResumeSlug: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				slug: z
					.string()
					.min(4)
					.max(20)
					.regex(/[a-zA-Z0-9\-]{4,20}/),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const check = await ctx.prisma.resume.findFirst({
				where: {
					urlSlug: input.slug,
				},
			})

			if (check) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message:
						'That slug is already in use, please choose another',
				})
			}

			await ctx.prisma.resume.update({
				where: {
					id: input.id,
				},
				data: {
					urlSlug: input.slug,
				},
			})
			await ctx.res.revalidate(`/view/${input.slug}`)
		}),
	revalidateCache: protectedProcedure
		.input(
			z.object({
				resumeId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const resume = await ctx.prisma.resume.findUnique({
				where: {
					id: input.resumeId,
				},
				select: {
					userId: true,
					urlSlug: true,
				},
			})

			if (resume && ctx.session.user.id !== resume.userId) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
				})
			}

			if (resume && resume.urlSlug !== null)
				await ctx.res.revalidate(`/view/${resume.urlSlug}`)
		}),
})
