import { sitePaths } from '@/library/constants'
import { siteSocialImage } from '@/library/data/images'
import { dynamicBaseURL } from '@/library/environment'
import type { SitemapEntry } from '@/types'
import type { MetadataRoute } from 'next'
import urlJoin from 'url-join'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const now = new Date()

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

	const articleEntries: SitemapEntry[] = Object.values(allArticlesData).map((article) => ({
		url: `${dynamicBaseURL}/articles/${article.slug}`,
		lastModified: article.updatedAt || article.publishedAt,
		changeFrequency: 'weekly',
		priority: 0.8,
	}))

	const maxURLs = 50_000
	const availableArticleSpaces = Math.max(0, maxURLs - otherEntries.length - homepage.length)

	const limitedArticleEntries = articleEntries
		.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
		.slice(0, availableArticleSpaces)

	const sortedEntries: SitemapEntry[] = [
		...homepage, //
		...otherEntries,
		...limitedArticleEntries,
	]

	return sortedEntries
}
