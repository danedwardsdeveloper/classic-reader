import type { authors, bookSlugs } from '@/library/constants'

export interface Book {
	slug: BookSlug | 'change or error'
	title: string
	author: AuthorDisplay
	chapters: Array<Array<string>>
}

export type BookSlug = (typeof bookSlugs)[keyof typeof bookSlugs]
export type BookSlugKey = keyof typeof bookSlugs

export type AuthorSlug = (typeof authors)[keyof typeof authors]['slug']
export type AuthorDisplay = (typeof authors)[keyof typeof authors]['display']
