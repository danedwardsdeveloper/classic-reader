import { writers } from '@/library/constants'
import type { WriterDisplayName, WriterSlug } from '@/types'

export function getWriterDisplayName(writerSlug: WriterSlug): WriterDisplayName | null {
	const writerEntry = Object.entries(writers).find(([slug, _]) => slug === writerSlug)
	return writerEntry ? writerEntry[1] : null
}
