import React, { useCallback, useContext, useEffect, useState } from 'react'
import AddSectionButton from '@/modules/editor/components/add-section-button/add_section_button'
import Section from '@/modules/editor/components/section/section'
import DropTarget from '@/modules/editor/components/section/drop-target'
import { type SectionModel } from '@/utils/common/types'
import { trpc } from '@/utils/trpc'
import { ResumeContext } from '../../utils/resumeContext'
import { useAutoAnimate } from '@formkit/auto-animate/react'
interface Props {
	columnIndex: number
}

export default function EditorColumn({ columnIndex }: Props) {
	const { resume, updateResume } = useContext(ResumeContext)
	const [sections, setSections] = useState<SectionModel[]>([])
	const [animateRef] = useAutoAnimate<HTMLDivElement>()

	useEffect(() => {
		setSections(
			resume.sections.filter((s) => s.columnIndex === columnIndex)
		)
	}, [columnIndex, resume.sections])

	const mAddSection = trpc.editor.addSection.useMutation({
		onSuccess: (d) => {
			if (!d) return
			resume.sections = [...resume.sections, { ...d, elements: [] }]
			updateResume(resume)
		},
	})

	const onAddSectionClicked = useCallback(() => {
		let order = 0
		sections.forEach((s) => (order = s.order > order ? s.order : order))
		order++

		mAddSection.mutate({
			resumeId: resume.id,
			columnIndex,
			order: order,
		})
	}, [columnIndex, mAddSection, resume, sections])

	const onUpdateSection = useCallback((s: SectionModel) => {
		setSections((secs) => {
			const idx = secs.findIndex((x) => x.id === s.id)
			secs.splice(idx, 1, { ...s })
			return [...secs]
		})
		return
	}, [])

	return (
		<div ref={animateRef}>
			{sections
				.sort((a, b) => a.order - b.order)
				.map((s, i) => (
					<div key={s.id}>
						<DropTarget index={i} columnIndex={columnIndex} />
						<Section
							index={i}
							model={s}
							onModelUpdated={onUpdateSection}
						></Section>
					</div>
				))}
			<DropTarget index={sections.length} columnIndex={columnIndex} />
			<AddSectionButton
				onAddSectionClicked={onAddSectionClicked}
				isLoading={mAddSection.isLoading}
			/>
		</div>
	)
}
