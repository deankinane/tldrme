import type { ResumeModel } from '@/utils/common/types'
import { trpc } from '@/utils/trpc'
import type { PropsWithChildren } from 'react'
import { createContext, useCallback, useState } from 'react'

interface IResumeContext {
	resume: ResumeModel
	updateResume: (resume: ResumeModel) => void
}

const defaultResumeModel: ResumeModel = {
	id: '',
	headerTitle: '',
	headerSubtitle: '',
	profilePicUrl: '',
	sections: [],
	userId: '',
	urlSlug: '',
	resumeStyleId: '',
	resumeStyle: {
		id: '',
		headerTitleColor: 1,
		headerSubtitleColor: 1,
		sectionTitleColor: 1,
		sectionSubtitleColor: 1,
		infoTextColor: 1,
		elementTextColor: 1,
		bulletColor: 1,
		iconColor: 1,
	},
}

export const ResumeContext = createContext<IResumeContext>({
	resume: defaultResumeModel,
	updateResume: () => {
		return
	},
})

interface Props extends PropsWithChildren {
	initialState: ResumeModel
}

export function ResumeProvider({ initialState, children }: Props) {
	const [resume, setResume] = useState<ResumeModel>(initialState)
	const mRevalidate = trpc.editor.revalidateCache.useMutation()
	const updateResume = useCallback((resume: ResumeModel) => {
		setResume({ ...resume })
		mRevalidate.mutate({
			resumeId: resume.id,
		})
	}, [])

	const resumeState: IResumeContext = {
		resume,
		updateResume,
	}
	return (
		<ResumeContext.Provider value={resumeState}>
			{children}
		</ResumeContext.Provider>
	)
}
