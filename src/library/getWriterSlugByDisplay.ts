import { writerDetails } from './constants'

export function getWriterSlugByDisplay(displayName: string): string | null {
	const authorEntries = Object.entries(writerDetails)
	const authorEntry = authorEntries.find(([_, authorData]) => authorData.display === displayName)
	return authorEntry ? authorEntry[1].slug : null
}
