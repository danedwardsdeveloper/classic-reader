import type { novels } from '@/library/constants'
import type { WriterDisplayName } from './writer'

interface Chapter {
	title?: string
	content: string[]
}

export interface Novel {
	slug: NovelSlug | 'change or error'
	title: string
	writer: WriterDisplayName
	chapters: Chapter[]
}

export type NovelSlug = (typeof novels)[keyof typeof novels]
