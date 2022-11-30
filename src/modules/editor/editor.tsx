import type { ResumeModel } from '@/utils/common/types'
import { useSmallScreen } from '@/utils/hooks/useMediaQuery'
import React, { useCallback, useState } from 'react'
import EditorColumn from './components/editor-column/editor-column'
import Header from './components/header/header'
import TrashDropTarget from './components/trash-drop-target/trash-drop-target'
import { ResumeProvider } from './utils/resumeContext'

interface Props {
	resume: ResumeModel
}
export default function Editor({ resume }: Props) {
	const smallScreen = useSmallScreen()

	return (
		<ResumeProvider initialState={resume}>
			<div className="min-h-full px-8 shadow-lg lg:px-16">
				<Header />

				<div
					className={`flex w-full ${
						smallScreen
							? 'relative snap-x snap-mandatory overflow-x-auto'
							: 'flex-row'
					}`}
				>
					<div
						className={`w-full md:w-96 ${
							smallScreen ? 'shrink-0 snap-center' : ''
						}`}
					>
						<EditorColumn columnIndex={0} />
					</div>

					<div
						className={`w-full md:pl-12 lg:w-auto lg:flex-grow lg:pl-16 ${
							smallScreen ? 'shrink-0 snap-center' : ''
						}`}
					>
						<EditorColumn columnIndex={1} />
					</div>
				</div>
			</div>

			<TrashDropTarget />
		</ResumeProvider>
	)
}
