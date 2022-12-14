import { trpc } from '@/utils/trpc'
import { CameraIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { ResumeContext } from '../../utils/resumeContext'
import CropperModal from './cropper-modal'
interface Props {
	imageData?: string
}
export default function ProfilePicture({ imageData }: Props) {
	const fileDialog = useRef<HTMLInputElement>(null)
	const { resume, updateResume } = useContext(ResumeContext)
	const [cropMode, setCropMode] = useState(false)
	const [cropImageData, setCropImageData] = useState('')

	const mUpdateProfilePicture = trpc.editor.updateProfilePicture.useMutation()

	const openFileDialog = useCallback(() => {
		if (!cropMode) fileDialog.current?.click()
	}, [cropMode])

	const onFileSelected = useCallback(
		(ev: React.ChangeEvent<HTMLInputElement>) => {
			if (ev.target.files) {
				const file = ev.target.files[0]
				if (!file) return

				const reader = new FileReader()
				reader.onloadend = function() {
					const result = reader.result?.toString()
					if (result) {
						setCropImageData(result)
						setCropMode(true)
					}
				}
				reader.readAsDataURL(file)
			}
		},
		[]
	)

	const onImageCropped = useCallback(
		(data: string) => {
			setCropMode(false)
			resume.profilePicUrl = data
			updateResume(resume)
			mUpdateProfilePicture.mutate({
				resumeId: resume.id,
				base64: data,
			})
		},
		[resume, updateResume],
	)

	return (
		<div
			onClick={openFileDialog}
			className="group relative h-16 w-16 cursor-pointer overflow-hidden rounded-full md:h-24 md:w-24 lg:h-48 lg:w-48"
		>
			<input
				type="file"
				accept=".jpg,.jpeg"
				ref={fileDialog}
				hidden
				onChange={onFileSelected}
			/>
			<div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500 p-5 opacity-0 transition-opacity group-hover:opacity-100">
				<CameraIcon className="w-10 text-white" />
			</div>
			{imageData ? (
				<Image
					src={imageData}
					alt="Profile Pic"
					width={200}
					height={200}
					className="h-full w-full transition-opacity group-hover:opacity-50"
					priority
					data-testid="profile-picture-image"
				/>
			) : (
				<div
					data-testid="profile-picture-default"
					className="h-full w-full rounded-full bg-slate-400 transition-opacity group-hover:opacity-50"
				></div>
			)}
			{cropMode ? <CropperModal image={cropImageData} onImageCropped={onImageCropped} /> : <></>}
		</div>
	)
}
