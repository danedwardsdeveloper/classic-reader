import fs from 'node:fs'
import path from 'node:path'
import type { Novel } from '@/types/definitions/novels'
import logger from './logger'

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

				const novelModule = await import(`./data/novels/${slug}`)
				const novel = novelModule.novel as Novel

				if (slug !== novel.slug) {
					logger.error(`Slug mismatch: ${slug}, ${novel.slug}`)
				}

				return novel
			}),
	)

	allNovelsCache = allBooks

	return allBooks
}

let getNovelsBySlugsCache: Record<string, Novel> | null = null

export async function getBookBySlug(slug: string): Promise<Novel | null> {
	if (!getNovelsBySlugsCache) {
		getNovelsBySlugsCache = {}
		const novels = await getAllNovels()

		for (const novel of novels) {
			if (novel.slug != null && novel.slug !== undefined) {
				getNovelsBySlugsCache[novel.slug] = novel
			}
		}
	}

	return getNovelsBySlugsCache[slug] || null
}
