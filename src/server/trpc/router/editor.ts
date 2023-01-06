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
			const resume = await ctx.prisma.resume.update({
				where: {
					id: input.resumeId,
				},
				data: {
					headerTitle: input.title,
					headerSubtitle: input.subTitle,
				},
			})
			if (resume.urlSlug !== null)
				ctx.res.revalidate(`/view/${resume.urlSlug}`)
		}),
	updateProfilePicture: protectedProcedure
		.input(
			z.object({
				resumeId: z.string(),
				base64: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const resume = await ctx.prisma.resume.update({
				where: {
					id: input.resumeId,
				},
				data: {
					profilePicUrl: input.base64,
				},
			})
			if (resume.urlSlug !== null)
				ctx.res.revalidate(`/view/${resume.urlSlug}`)
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
			const newSection = await ctx.prisma.section.create({
				data: {
					columnIndex: input.columnIndex,
					resumeId: input.resumeId,
					order: input.order,
					title: 'New Section',
				},
			})
			const resume = await ctx.prisma.resume.findUnique({
				where: {
					id: input.resumeId,
				},
				select: {
					urlSlug: true,
				},
			})
			if (resume !== null && resume.urlSlug !== null)
				ctx.res.revalidate(`/view/${resume.urlSlug}`)
			return newSection
		}),
	updateSectionTitle: protectedProcedure
		.input(
			z.object({
				sectionId: z.string(),
				title: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const section = await ctx.prisma.section.update({
				where: {
					id: input.sectionId,
				},
				data: {
					title: input.title,
				},
			})
			const resume = await ctx.prisma.resume.findUnique({
				where: {
					id: section.resumeId,
				},
				select: {
					urlSlug: true,
				},
			})
			if (resume !== null && resume.urlSlug !== null)
				ctx.res.revalidate(`/view/${resume.urlSlug}`)
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
			let resumeId = ''
			for (let i = 0; i < input.length; i++) {
				const s = input[i]
				if (s) {
					const section = await ctx.prisma.section.update({
						where: { id: s.sectionId },
						data: { order: s.newOrder },
					})
					resumeId = section.resumeId
				}
			}
			const resume = await ctx.prisma.resume.findUnique({
				where: {
					id: resumeId,
				},
				select: {
					urlSlug: true,
				},
			})
			if (resume !== null && resume.urlSlug !== null)
				ctx.res.revalidate(`/view/${resume.urlSlug}`)
		}),
	removeSection: protectedProcedure
		.input(
			z.object({
				sectionId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const section = await ctx.prisma.section.delete({
				where: {
					id: input.sectionId,
				},
			})
			const resume = await ctx.prisma.resume.findUnique({
				where: {
					id: section.resumeId,
				},
				select: {
					urlSlug: true,
				},
			})
			if (resume !== null && resume.urlSlug !== null)
				ctx.res.revalidate(`/view/${resume.urlSlug}`)
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
			const element = await ctx.prisma.element.create({
				data: {
					sectionId: input.sectionId,
					order: input.order,
					type: input.type,
					text: 'New Element',
					icon: input.type === 'IconText' ? 'FolderIcon' : '',
				},
			})
			const section = await ctx.prisma.section.findUnique({
				where: {
					id: element.sectionId,
				},
				select: {
					resumeId: true,
				},
			})
			const resume = await ctx.prisma.resume.findUnique({
				where: {
					id: section?.resumeId,
				},
				select: {
					urlSlug: true,
				},
			})
			if (resume !== null && resume.urlSlug !== null)
				ctx.res.revalidate(`/view/${resume.urlSlug}`)

			return element
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
			const element = await ctx.prisma.element.update({
				where: {
					id: input.elementId,
				},
				data: {
					text: input.text,
					icon: input.icon,
				},
			})
			const section = await ctx.prisma.section.findUnique({
				where: {
					id: element.sectionId,
				},
				select: {
					resumeId: true,
				},
			})
			const resume = await ctx.prisma.resume.findUnique({
				where: {
					id: section?.resumeId,
				},
				select: {
					urlSlug: true,
				},
			})
			if (resume !== null && resume.urlSlug !== null)
				ctx.res.revalidate(`/view/${resume.urlSlug}`)
		}),
	removeElement: protectedProcedure
		.input(
			z.object({
				elementId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const element = await ctx.prisma.element.delete({
				where: {
					id: input.elementId,
				},
			})
			const section = await ctx.prisma.section.findUnique({
				where: {
					id: element.sectionId,
				},
				select: {
					resumeId: true,
				},
			})
			const resume = await ctx.prisma.resume.findUnique({
				where: {
					id: section?.resumeId,
				},
				select: {
					urlSlug: true,
				},
			})
			if (resume !== null && resume.urlSlug !== null)
				ctx.res.revalidate(`/view/${resume.urlSlug}`)
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
			let sectionId = ''
			for (let i = 0; i < input.length; i++) {
				const s = input[i]
				if (s) {
					const element = await ctx.prisma.element.update({
						where: { id: s.elementId },
						data: { order: s.newOrder },
					})
					sectionId = element.sectionId
				}
			}
			const section = await ctx.prisma.section.findUnique({
				where: {
					id: sectionId,
				},
				select: {
					resumeId: true,
				},
			})
			const resume = await ctx.prisma.resume.findUnique({
				where: {
					id: section?.resumeId,
				},
				select: {
					urlSlug: true,
				},
			})
			if (resume !== null && resume.urlSlug !== null)
				ctx.res.revalidate(`/view/${resume.urlSlug}`)
		}),
	updateResumeStyle: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				headerTitleColor: z.number(),
				headerSubtitleColor: z.number(),
				sectionTitleColor: z.number(),
				sectionSubtitleColor: z.number(),
				elementTextColor: z.number(),
				bulletColor: z.number(),
				iconColor: z.number(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const resumeStyle = await ctx.prisma.resumeStyle.update({
				where: {
					id: input.id,
				},
				data: {
					headerTitleColor: input.headerTitleColor,
					headerSubtitleColor: input.headerSubtitleColor,
					sectionTitleColor: input.sectionTitleColor,
					sectionSubtitleColor: input.sectionSubtitleColor,
					elementTextColor: input.elementTextColor,
					bulletColor: input.bulletColor,
					iconColor: input.iconColor,
				},
			})
			const resume = await ctx.prisma.resume.findUnique({
				where: {
					resumeStyleId: resumeStyle.id,
				},
				select: {
					urlSlug: true,
				},
			})
			if (resume !== null && resume.urlSlug !== null)
				ctx.res.revalidate(`/view/${resume.urlSlug}`)
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
			ctx.res.revalidate(`/view/${input.slug}`)
		}),
})
