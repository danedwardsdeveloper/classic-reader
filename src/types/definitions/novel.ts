import type { novels } from '@/library/constants'
import type { WriterDisplayName, WriterSlug } from './writers'

export type NovelSlug = keyof typeof novels
export type NovelDisplayTitle = (typeof novels)[NovelSlug]

export interface Chapter {
	title?: string
	content: string[]
}

export interface Novel {
	titleDisplay: NovelDisplayTitle
	titleSlug: NovelSlug
	writerDisplay: WriterDisplayName
	writerSlug: WriterSlug
	updated: Date // for sitemap
	chapters: Chapter[]
}
