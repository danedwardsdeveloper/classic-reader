import fs from 'node:fs'
import path from 'node:path'
import logger from '@/library/logger'
import type { Novel } from '@/types'

let allNovelsCache: Novel[] | null = null

export async function getAllNovels(): Promise<Novel[]> {
	if (allNovelsCache) {
		return allNovelsCache
	}

	const dataDirectory = path.join(process.cwd(), 'src', 'library', 'data', 'novels')
	const filenames = fs.readdirSync(dataDirectory)

	const allBooks = await Promise.all(
		filenames
			.filter((filename) => filename.endsWith('.ts'))
			.map(async (filename) => {
				const slug = filename.replace(/\.(ts)$/, '')

				// Path alias won't work here
				const novelModule = await import(`../../data/novels/${slug}`)
				const novel = novelModule.novel as Novel

				if (slug !== novel.titleSlug) {
					logger.error(`Slug mismatch: ${slug}, ${novel.titleSlug}`)
				}

				return novel
			}),
	)

	allNovelsCache = allBooks

	return allBooks
}

let getNovelsBySlugsCache: Record<string, Novel> | null = null

export async function getNovelBySlug(slug: string): Promise<Novel | null> {
	if (!getNovelsBySlugsCache) {
		getNovelsBySlugsCache = {}
		const novels = await getAllNovels()

		for (const novel of novels) {
			if (novel.titleSlug != null && novel.titleSlug !== undefined) {
				getNovelsBySlugsCache[novel.titleSlug] = novel
			}
		}
	}

	return getNovelsBySlugsCache[slug] || null
}
