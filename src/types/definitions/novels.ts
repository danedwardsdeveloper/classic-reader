import type { novels } from '@/library/constants'
import type { WriterDisplayName } from './writer'

export interface Novel {
	slug: NovelSlug | 'change or error'
	title: string
	writer: WriterDisplayName
	chapters: Array<Array<string>>
}

export type NovelSlug = (typeof novels)[keyof typeof novels]
// export type NovelSlugKey = keyof typeof novels
