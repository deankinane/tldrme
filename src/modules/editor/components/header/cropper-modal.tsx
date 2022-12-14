import { MediaSize, useMediaQuery } from '@/utils/hooks/useMediaQuery'
import type { ChangeEvent } from 'react'
import { useRef } from 'react'
import React, { useCallback, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

interface Props {
	image: string
	onImageCropped: (data: string) => void
}

export default function CropperModal({ image, onImageCropped }: Props) {
	const isMd = useMediaQuery(`(min-width: ${MediaSize.md})`)
	const [zoom, setZoom] = useState(1.0)
	const editor = useRef<AvatarEditor | null>(null)

	const onZoomChanged = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
		setZoom(parseFloat(ev.currentTarget.value))
	}, [])

	const onClickSave = useCallback(
		() => {
			if (editor.current) {
				const canvas = editor.current.getImage()
				const dataUrl = canvas.toDataURL()
				onImageCropped(dataUrl)
			}
		},
		[onImageCropped],
	)

	return (
		<div className="fixed top-0 bottom-0 left-0 right-0 z-10 bg-[#000000cc]">
			<div className="absolute top-1/3 left-1/2 w-fit -translate-y-1/2 -translate-x-1/2 rounded-md bg-white shadow-lg shadow-black">
				<AvatarEditor
					ref={editor}
					image={image}
					width={isMd ? 500 : 200}
					height={isMd ? 500 : 200}
					scale={zoom}
				/>
				<div className="px-8 py-6">
					<div className="flex w-full items-center justify-center">
						<p className="mr-4 text-sm font-bold">Zoom</p>
						<input
							className="w-full"
							type="range"
							min="1"
							max="2"
							step="0.1"
							value={zoom}
							onChange={onZoomChanged}
						/>
						<button
							onClick={onClickSave}
							className="ml-8 rounded-md bg-purple-700 px-4 py-1 font-semibold text-white">
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
