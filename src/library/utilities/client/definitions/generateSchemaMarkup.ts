import { serverSideBaseUrl } from '@/library/serverEnvironment'
import type { Novel } from '@/types'
import type { Book, CollectionPage, Organization, Chapter as SchemaChapter, WebSite, WithContext } from 'schema-dts'

export function generateWebsiteSchema(): WithContext<WebSite> {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'ClassicReader.org',
		url: serverSideBaseUrl,
		description: 'Read classic novels online without any ads, distractions or clutter',
		publisher: {
			'@type': 'Organization',
			name: 'ClassicReader.org',
		},
	}
}

export function generateOrganizationSchema(): WithContext<Organization> {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'ClassicReader.org',
		url: serverSideBaseUrl,
		description: 'A website for reading classic novels without distractions',
		logo: `${serverSideBaseUrl}/images/classicreader.png`,
	}
}

export function generateBookSchema(novel: Novel): WithContext<Book> {
	return {
		'@context': 'https://schema.org',
		'@type': 'Book',
		name: novel.titleDisplay,
		author: {
			'@type': 'Person',
			name: novel.writerDisplay,
		},
		url: `${serverSideBaseUrl}/writers/${novel.writerSlug}/novels/${novel.titleSlug}`,
		genre: 'Classic Literature',
		inLanguage: 'en',
		isAccessibleForFree: true,
		publisher: {
			'@type': 'Organization',
			name: 'ClassicReader.org',
		},
		dateModified: novel.updated.toISOString(),
		numberOfPages: novel.chapters.length,
		hasPart: novel.chapters.map((chapter, index) => ({
			'@type': 'Chapter' as const,
			name: chapter.title || `Chapter ${index + 1}`,
			position: index + 1,
			url: `${serverSideBaseUrl}/writers/${novel.writerSlug}/novels/${novel.titleSlug}/chapter-${index + 1}${chapter.title ? `-${chapter.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : ''}`,
		})),
	}
}

export function generateChapterSchema(novel: Novel, chapterIndex: number, chapterSlug: string): WithContext<SchemaChapter> {
	const chapter = novel.chapters[chapterIndex]
	const chapterNumber = chapterIndex + 1

	return {
		'@context': 'https://schema.org',
		'@type': 'Chapter',
		name: chapter.title || `Chapter ${chapterNumber}`,
		position: chapterNumber,
		isPartOf: {
			'@type': 'Book',
			name: novel.titleDisplay,
			author: {
				'@type': 'Person',
				name: novel.writerDisplay,
			},
			url: `${serverSideBaseUrl}/writers/${novel.writerSlug}/novels/${novel.titleSlug}`,
		},
		url: `${serverSideBaseUrl}/writers/${novel.writerSlug}/novels/${novel.titleSlug}/${chapterSlug}`,
		text: chapter.content.join('\n\n'),
	}
}

export function generateCollectionPageSchema(novels: Novel[], pageTitle: string, pageUrl: string): WithContext<CollectionPage> {
	return {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: pageTitle,
		url: `${serverSideBaseUrl}${pageUrl}`,
		description: 'Collection of classic novels available for free reading',
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: novels.length,
			itemListElement: novels.map((novel, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				item: {
					'@type': 'Book',
					name: novel.titleDisplay,
					author: {
						'@type': 'Person',
						name: novel.writerDisplay,
					},
					url: `${serverSideBaseUrl}/writers/${novel.writerSlug}/novels/${novel.titleSlug}`,
				},
			})),
		},
		isPartOf: {
			'@type': 'WebSite',
			name: 'ClassicReader.org',
			url: serverSideBaseUrl,
		},
	}
}
