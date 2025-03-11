import type { bookSlugs } from '@/library/constants'

export interface Book {
	slug: BookSlug | 'change or error'
	title: string
	author: string
	chapters: Array<Array<string>>
}

export type BookSlug = (typeof bookSlugs)[keyof typeof bookSlugs]
export type BookSlugKey = keyof typeof bookSlugs
