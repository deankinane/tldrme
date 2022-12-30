import { lookupIcon, PossibleIcons } from 'heroicons-lookup'
import React, { useMemo } from 'react'
interface Props extends React.ComponentProps<'svg'> {
	icon: PossibleIcons
}
export default function IconLookup({ icon, ...props }: Props) {
	const Icon = useMemo(() => lookupIcon(icon, 'solid'), [icon])

	return <Icon {...props} />
}
