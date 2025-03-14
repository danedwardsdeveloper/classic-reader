import type { WriterDisplayName, WriterSlug } from '@/types'
import { writerDetails } from './constants'

export function getSlugFromDisplay(displayName: WriterDisplayName): WriterSlug | undefined {
	const entries = Object.entries(writerDetails) as [WriterSlug, WriterDisplayName][]
	const entry = entries.find(([_, value]) => value === displayName)
	return entry ? entry[0] : undefined
}
