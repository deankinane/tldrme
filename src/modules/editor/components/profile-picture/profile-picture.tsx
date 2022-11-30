import Image from 'next/image'
import React from 'react'
interface Props {
	imageUrl?: string
}
export default function ProfilePicture({ imageUrl }: Props) {
	return (
		<div className="md: h-12 w-12 overflow-hidden rounded-full md:h-24 md:w-24 lg:h-48 lg:w-48">
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt="Profile Pic"
					width={200}
					height={200}
					className="h-full w-full"
					priority
					data-testid="profile-picture-image"
				/>
			) : (
				<div
					data-testid="profile-picture-default"
					className="h-full w-full rounded-full bg-slate-400"
				></div>
			)}
		</div>
	)
}
