import type { bookSlugs } from '@/library/books'

export interface Book {
	slug: BookSlug
	title: string
	author: string
	chapters: Array<Array<string>>
}

export type BookSlug = (typeof bookSlugs)[keyof typeof bookSlugs]
export type BookSlugKey = keyof typeof bookSlugs
