import { useEffect, useState } from 'react'

export enum MediaSize {
	sm = '640px',
	md = '768px',
	lg = '1024px',
	xl = '1280px',
	'2xl' = '1536px',
}

export const useMediaQuery = (query: string) => {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		// const query = `(max-width: ${mediaSize})`
		const media = window.matchMedia(query)
		if (media.matches !== matches) {
			setMatches(media.matches)
		}
		const listener = () => setMatches(media.matches)
		window.addEventListener('resize', listener)
		return () => window.removeEventListener('resize', listener)
	}, [matches, query])

	return matches
}

export const useSmallScreen = () => {
	const matches = useMediaQuery(`(max-width: ${MediaSize.md})`)
	return matches
}
