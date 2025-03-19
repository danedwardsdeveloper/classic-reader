import type { Novel, WriterSlug } from '@/types'
import urlJoin from 'proper-url-join'
import slugify from 'slugify'

export function generateWriterPath(writerSlug: WriterSlug) {
	return urlJoin('/writers', writerSlug, 'novels')
}

export function generateNovelPath(novelData: Novel): string {
	// Leading slash is essential for Link behaviour
	return urlJoin('/writers', novelData.writerSlug, 'novels', novelData.titleSlug)
}

export function generateChapterParam({
	novelData,
	oneIndexedChapterNumber,
}: { novelData: Novel; oneIndexedChapterNumber: number }): string {
	const zeroIndexedChapterNumber = oneIndexedChapterNumber - 1
	const chapter = novelData.chapters[zeroIndexedChapterNumber]
	const chapterSlugBase = `chapter-${oneIndexedChapterNumber}`

	if (!chapter?.title) return chapterSlugBase

	return `${chapterSlugBase}-${slugify(chapter.title, { lower: true, strict: true })}`
}

export function generateChapterPath({ novelData, oneIndexedChapterNumber }: { novelData: Novel; oneIndexedChapterNumber: number }): string {
	const novelPath = generateNovelPath(novelData)
	const chapterParam = generateChapterParam({ novelData, oneIndexedChapterNumber })

	return urlJoin(novelPath, chapterParam)
}
