import { MediaSize, useMediaQuery } from '@/utils/hooks/useMediaQuery'
import type { ChangeEvent } from 'react'
import { useRef } from 'react'
import React, { useCallback, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

interface Props {
	image: string
}

export default function CropperModal({ image }: Props) {
	const isMd = useMediaQuery(`(min-width: ${MediaSize.md})`)
	const [zoom, setZoom] = useState(1.0)
	const editor = useRef(null)

	const onZoomChanged = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
		setZoom(parseFloat(ev.currentTarget.value))
	}, [])

	return (
		<div className="fixed top-0 bottom-0 left-0 right-0 z-10 bg-[#000000cc]">
			<div className="absolute top-1/3 left-1/2 w-fit -translate-y-1/2 -translate-x-1/2 rounded-md bg-white shadow-md">
				<AvatarEditor
					ref={editor}
					image={image}
					width={isMd ? 500 : 200}
					height={isMd ? 500 : 200}
					scale={zoom}
				/>
				<div className="px-4 py-3">
					<input
						className="w-full"
						type="range"
						min="1"
						max="2"
						step="0.1"
						value={zoom}
						onChange={onZoomChanged}
					/>
					<button>Save</button>
				</div>
			</div>
		</div>
	)
}
