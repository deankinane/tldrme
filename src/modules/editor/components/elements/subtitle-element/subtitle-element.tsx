import type { SubTitleModel } from '@/utils/common/types'
import React, { useCallback } from 'react'
import EditText from '../../edit-text/edit-text'

interface Props {
	model: SubTitleModel
}
export default function SubTitleElement({ model }: Props) {
	const onTextChanged = useCallback((text: string) => {
		// update db
	}, [])

	return (
		<div>
			<EditText
				fontStyles="text-lg"
				onTextChanged={onTextChanged}
				text={model.elementSubTitle?.text}
			/>
		</div>
	)
}
