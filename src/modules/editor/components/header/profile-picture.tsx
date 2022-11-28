import Image from 'next/image'
import React from 'react'
interface Props {
	imageUrl?: string
}
export default function ProfilePicture({ imageUrl }: Props) {
	return (
		<div className="overflow-hidden rounded-full">
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt="Profile Pic"
					width={200}
					height={200}
					className="h-28 w-28 lg:h-48 lg:w-48"
					priority
					data-testid="profile-picture-image"
				/>
			) : (
				<div data-testid="profile-picture-default">No pic</div>
			)}
		</div>
	)
}
