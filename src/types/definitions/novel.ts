import type { novels } from '@/library/constants'
import type { WriterDisplayName, WriterSlug } from './writers'

export type NovelSlug = keyof typeof novels
export type NovelDisplayTitle = (typeof novels)[NovelSlug]

interface Chapter {
	title?: string
	content: string[]
}

export interface Novel {
	titleDisplay: NovelDisplayTitle
	titleSlug: NovelSlug
	writerDisplay: WriterDisplayName
	writerSlug: WriterSlug
	chapters: Chapter[]
}
