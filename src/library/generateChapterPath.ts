import type { Novel } from '@/types'
import slugify from 'slugify'
import urlJoin from 'url-join'

export function generateChapterPath({ novelData, oneIndexedChapterNumber }: { novelData: Novel; oneIndexedChapterNumber: number }): string {
	const zeroIndexedChapterNumber = oneIndexedChapterNumber - 1
	const chapter = novelData.chapters[zeroIndexedChapterNumber]

	const chapterSlugBase = `chapter-${oneIndexedChapterNumber}`
	const chapterSlug = chapter.title ? `${chapterSlugBase}-${slugify(chapter.title, { lower: true, strict: true })}` : chapterSlugBase

	return urlJoin('writers', novelData.writerSlug, 'novels', novelData.titleSlug, chapterSlug)
}
