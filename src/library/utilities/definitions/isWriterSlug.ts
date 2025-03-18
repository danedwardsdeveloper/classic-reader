import { writers } from '@/library/constants'
import type { WriterSlug } from '@/types'

export function isWriterSlug(slug: string): slug is WriterSlug {
	return slug in writers
}
