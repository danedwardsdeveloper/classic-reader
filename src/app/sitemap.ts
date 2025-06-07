import { sitePaths, writers } from '@/library/constants'
import { siteSocialImage } from '@/library/data/images'
import { dynamicBaseURL } from '@/library/environment'
import { generateChapterParam } from '@/library/utilities/client/definitions/generatePaths'
import { getAllNovels } from '@/library/utilities/server'
import type { SitemapEntry } from '@/types'
import type { MetadataRoute } from 'next'
import urlJoin from 'url-join'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const now = new Date()
	const allNovels = await getAllNovels()

	const homepage: SitemapEntry[] = [
		{
			url: dynamicBaseURL,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 1,
			images: [siteSocialImage.absolute],
		},
	]

	const otherEntries: SitemapEntry[] = sitePaths
		.filter((entry) => !entry.hidden)
		.map((entry) => ({
			url: urlJoin(dynamicBaseURL, entry.path),
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.9,
		}))

	const writerEntries: SitemapEntry[] = Object.keys(writers).map((writerSlug) => ({
		url: urlJoin(dynamicBaseURL, 'writers', writerSlug),
		lastModified: now,
		changeFrequency: 'monthly',
		priority: 0.8,
	}))

	const novelEntries: SitemapEntry[] = allNovels.map((novel) => ({
		url: urlJoin(dynamicBaseURL, 'writers', novel.writerSlug, 'novels', novel.titleSlug),
		lastModified: novel.updated,
		changeFrequency: 'monthly',
		priority: 0.7,
	}))

	const chapterEntries: SitemapEntry[] = allNovels.flatMap((novel) =>
		novel.chapters.map((_, zeroIndexedChapter) => ({
			url: urlJoin(
				dynamicBaseURL,
				'writers',
				novel.writerSlug,
				'novels',
				novel.titleSlug,
				generateChapterParam({
					novelData: novel,
					oneIndexedChapterNumber: zeroIndexedChapter + 1,
				}),
			),
			lastModified: novel.updated,
			changeFrequency: 'yearly',
			priority: 0.6,
		})),
	)

	const maxURLs = 50_000

	const baseEntries = [
		...homepage, //
		...otherEntries,
		...writerEntries,
		...novelEntries,
	]
	const availableChapterSpaces = Math.max(0, maxURLs - baseEntries.length)

	const limitedChapterEntries = chapterEntries.slice(0, availableChapterSpaces)

	const sortedEntries: SitemapEntry[] = [
		...homepage, //
		...otherEntries,
		...writerEntries,
		...novelEntries,
		...limitedChapterEntries,
	]

	return sortedEntries
}
