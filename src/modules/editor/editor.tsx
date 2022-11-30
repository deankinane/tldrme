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
	const [currentColumn, setCurrentColumn] = useState(0)

	const switchColumn = useCallback(() => {
		const newCol = (currentColumn + 1) % 2
		console.log('New Col', newCol)
		setCurrentColumn(newCol)
	}, [currentColumn])

	return (
		<ResumeProvider initialState={resume}>
			<div className="min-h-full px-8 shadow-lg lg:px-16">
				<Header />

				<div className="flex flex-row">
					{!smallScreen || (smallScreen && currentColumn === 0) ? (
						<div className="w-full md:w-96">
							<EditorColumn columnIndex={0} />
						</div>
					) : (
						<></>
					)}

					{!smallScreen || (smallScreen && currentColumn === 1) ? (
						<div className="w-full md:pl-12 lg:w-auto lg:flex-grow lg:pl-16">
							<EditorColumn columnIndex={1} />
						</div>
					) : (
						<></>
					)}
				</div>
			</div>

			<TrashDropTarget />

			{smallScreen ? (
				<div className="fixed bottom-4 left-4">
					<button
						className="h-8 w-8 rounded-md bg-cyan-600"
						onClick={switchColumn}
					>
						O
					</button>
				</div>
			) : (
				<></>
			)}
		</ResumeProvider>
	)
}
