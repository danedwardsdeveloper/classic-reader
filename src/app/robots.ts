import { sitePaths } from '@/library/constants/definitions/sitePaths'
import { serverSideBaseUrl } from '@/library/serverEnvironment'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: sitePaths.filter((site) => site.hidden).map((site) => site.path),
		},
		sitemap: `${serverSideBaseUrl}/sitemap.xml`,
	}
}
