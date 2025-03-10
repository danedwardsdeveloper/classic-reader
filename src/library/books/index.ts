import fs from 'node:fs'
import path from 'node:path'
import type { Book } from '@/types'
import logger from '../logger'

export const bookSlugs = {
	prideAndPrejudice: 'pride-and-prejudice',
	dracula: 'dracula',
} as const

let allBooksCache: Book[] | null = null

export async function getAllBooks(): Promise<Book[]> {
	if (allBooksCache) {
		return allBooksCache
	}

	const dataDirectory = path.join(process.cwd(), 'src', 'library', 'books', 'data')
	const filenames = fs.readdirSync(dataDirectory)

	// Use Promise.all to handle multiple async imports
	const allBooks = await Promise.all(
		filenames
			.filter((filename) => filename.endsWith('.ts'))
			.map(async (filename) => {
				const slug = filename.replace(/\.(ts)$/, '')

				// Use dynamic import instead of require
				const bookModule = await import(`./data/${slug}`)
				const book = bookModule.book as Book

				if (slug !== book.slug) {
					logger.error(`Slug mismatch: ${slug}, ${book.slug}`)
				}

				return book
			}),
	)

	allBooksCache = allBooks

	return allBooks
}

let getBooksBySlugsCache: Record<string, Book> | null = null

export async function getBookBySlug(slug: string): Promise<Book | null> {
	if (!getBooksBySlugsCache) {
		getBooksBySlugsCache = {}
		const books = await getAllBooks()

		for (const book of books) {
			if (book.slug != null) {
				getBooksBySlugsCache[book.slug] = book
			}
		}
	}

	return getBooksBySlugsCache[slug] || null
}
