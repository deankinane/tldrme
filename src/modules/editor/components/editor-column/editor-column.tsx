import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import AddSectionButton from '@/modules/editor/components/add-section-button/add_section_button'
import Section from '@/modules/editor/components/section/section'
import DropTarget from '@/modules/editor/components/section/drop-target'
import { type SectionModel } from '@/utils/common/types'
import { trpc } from '@/utils/trpc'
import { v4 as uuid } from 'uuid'
import { ResumeContext } from '../../utils/resumeContext'

interface Props {
	columnIndex: number
}

export default function EditorColumn({ columnIndex }: Props) {
	const { resume, updateResume } = useContext(ResumeContext)
	const [sections, setSections] = useState<SectionModel[]>([])
	const newQueue = useRef<string[]>([])

	useEffect(() => {
		setSections(
			resume.sections.filter((s) => s.columnIndex === columnIndex)
		)
	}, [columnIndex, resume.sections])

	const mAddSection = trpc.editor.addSection.useMutation({
		onSuccess: (d) => {
			if (!d) return
			const mergeId =
				newQueue.current.length > 0
					? newQueue.current.splice(0, 1)[0]
					: undefined

			if (mergeId) {
				resume.sections.forEach(
					(s) => (s.id = s.id === mergeId ? d.id : s.id)
				)
				updateResume(resume)
			}
		},
	})

	const onAddSectionClicked = useCallback(() => {
		const newSection: SectionModel = {
			resumeId: resume.id,
			columnIndex,
			order: sections.length,
			title: 'New Section',
			elements: [],
			id: uuid(),
		}

		newQueue.current.push(newSection.id)

		resume.sections = [...resume.sections, newSection]
		setSections(
			resume.sections.filter((s) => s.columnIndex === columnIndex)
		)
		updateResume(resume)

		mAddSection.mutate({
			resumeId: resume.id,
			columnIndex,
			order: newSection.order,
		})
	}, [columnIndex, mAddSection, resume, sections.length, updateResume])

	const onUpdateSection = useCallback((s: SectionModel) => {
		setSections((secs) => {
			const idx = secs.findIndex((x) => x.id === s.id)
			secs.splice(idx, 1, { ...s })
			return [...secs]
		})
		return
	}, [])

	return (
		<div>
			{sections.map((s, i) => (
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
			<AddSectionButton onAddSectionClicked={onAddSectionClicked} />
		</div>
	)
}
