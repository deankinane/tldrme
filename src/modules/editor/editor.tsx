import type { ResumeModel } from '@/utils/common/types'
import { useSmallScreen } from '@/utils/hooks/useMediaQuery'
import React from 'react'
import ActionButtons from './components/action-buttons/action-buttons'
import EditorColumn from './components/editor-column/editor-column'
import Header from './components/header/header'
import { Sidebar } from './components/sidebar/sidebar'
import TrashDropTarget from './components/trash-drop-target/trash-drop-target'
import { ResumeProvider } from './utils/resumeContext'

interface Props {
	resume: ResumeModel
}
export default function Editor({ resume }: Props) {
	const smallScreen = useSmallScreen()

	return (
		<ResumeProvider initialState={resume}>
			<div className='h-full flex max-w-screen-2xl'>

				<Sidebar />
				<div className="h-full bg-white overflow-hidden md:h-auto md:min-h-full md:overflow-visible md:px-8 lg:px-16 grow">
					<Header />

					<div
						className={`flex w-full ${smallScreen
							? 'fixed bottom-0 right-0 left-0 top-52 snap-x snap-mandatory overflow-x-auto'
							: 'flex-row'
							}`}
					>
						<div
							className={`w-full shrink-0 overflow-y-scroll px-4 md:w-80 md:overflow-y-visible pt-8 md:px-0 lg:w-96 ${smallScreen ? 'snap-center' : ''
								}`}
						>
							<EditorColumn columnIndex={0} />
						</div>

						<div
							className={`h-full overflow-y-scroll px-4 md:flex-grow md:overflow-y-visible  md:px-0 md:pl-12 pt-8 lg:w-auto lg:pl-16 ${smallScreen ? 'w-full shrink-0 snap-center' : ''
								}`}
						>
							<EditorColumn columnIndex={1} />
						</div>
					</div>
				</div>
			</div>

			<TrashDropTarget />
			<ActionButtons />
		</ResumeProvider>
	)
}
