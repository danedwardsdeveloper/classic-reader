import type { bookSlugs, writerDetails } from '@/library/constants'

export interface Book {
	slug: BookSlug | 'change or error'
	title: string
	writer: WriterDisplay
	chapters: Array<Array<string>>
}

export type BookSlug = (typeof bookSlugs)[keyof typeof bookSlugs]
export type BookSlugKey = keyof typeof bookSlugs

export type WriterSlug = (typeof writerDetails)[keyof typeof writerDetails]['slug']
export type WriterDisplay = (typeof writerDetails)[keyof typeof writerDetails]['display']
