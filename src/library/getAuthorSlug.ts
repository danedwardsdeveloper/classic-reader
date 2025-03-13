import { authors } from './constants'

export function getAuthorSlugByDisplay(displayName: string): string | null {
	const authorEntries = Object.entries(authors)
	const authorEntry = authorEntries.find(([_, authorData]) => authorData.display === displayName)
	return authorEntry ? authorEntry[1].slug : null
}
