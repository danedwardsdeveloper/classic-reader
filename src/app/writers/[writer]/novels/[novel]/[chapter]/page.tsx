import BreadCrumbs from '@/components/BreadCrumbs'
import ChapterNavigation from '@/components/ChapterNavigation'
import Footer from '@/components/Footer'
import { metadataExtensionPhrases } from '@/library/environment/publicVariables'
import logger from '@/library/logger'
import { getAllNovels, getNovelBySlug } from '@/library/utilities'
import { generateChapterParam } from '@/library/utilities/definitions/generatePaths'
import { optimiseMetadata } from '@/library/utilities/definitions/optimiseMetadata'
import type { Novel } from '@/types'
import type { Metadata } from 'next'

interface ResolvedParams {
	writer: string
	novel: string
	chapter: string
}
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

function renderChapterNames(novel: Novel, page: number): { title: string; metatitle: string; metaDescriptionBase: string; url: string } {
	const pageIndex = Number(page) - 1
	const chapterExists = pageIndex >= 0 && pageIndex < novel.chapters.length
	const chapterName = chapterExists ? novel.chapters[pageIndex].title : null

	const metatitleStart = chapterName ? `Chapter ${page} | ${chapterName} - ` : `Chapter ${page} - `
	const metatitleEnd = `${novel.titleDisplay} by ${novel.writerDisplay}`

	const metaDescriptionBase = `Read chapter ${page}${chapterName ? `, ${chapterName}, from` : ' of'} ${novel.titleDisplay} by ${novel.writerDisplay}`

	return {
		title: chapterName || `Chapter ${page}`,
		metatitle: `${metatitleStart}${metatitleEnd}`,
		metaDescriptionBase,
		url: '',
	}
}

export async function generateStaticParams(): StaticParams {
	const novels = await getAllNovels()

	return novels.flatMap((novelData) =>
		novelData.chapters.map((_, zeroIndexedChapter) => ({
			writer: novelData.writerSlug,
			novel: novelData.titleSlug,
			chapter: generateChapterParam({
				novelData,
				oneIndexedChapterNumber: zeroIndexedChapter + 1,
			}),
		})),
	)
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { writer, chapter: chapterSlug, novel: novelSlug } = await params
	const novelData = await getNovelBySlug(novelSlug)
	const currentChapterNumber = Number(chapterSlug.split('-')[1])

	if (!novelData) {
		logger.error(`Couldn't calculate metatitle for ${novelSlug}`)
		return { title: 'Chapter not found' }
	}

	const { metatitle, metaDescriptionBase } = renderChapterNames(novelData, currentChapterNumber)

	const optimisedTitle = optimiseMetadata({
		base: metatitle,
		extraPhrases: metadataExtensionPhrases,
		type: 'title',
		separator: ' | ',
	})

	const optimisedMetaDescription = optimiseMetadata({
		base: metaDescriptionBase,
		extraPhrases: metadataExtensionPhrases,
		type: 'description',
		separator: '. ',
	})

	return {
		title: optimisedTitle,
		description: optimisedMetaDescription,
		alternates: {
			canonical: `/writers/${writer}/novels/${novelSlug}/${chapterSlug}`,
		},
	}
}

export default async function ChapterPage({ params }: { params: Params }) {
	const { novel, chapter: chapterSlug } = await params
	const currentChapterNumber = Number(chapterSlug.split('-')[1])
	const novelData = await getNovelBySlug(novel)

	if (!novelData) return null

	const zeroIndexedChapter = novelData.chapters[currentChapterNumber - 1]
	const { title } = renderChapterNames(novelData, currentChapterNumber)

	return (
		<>
			<BreadCrumbs
				currentPageName={`Chapter ${currentChapterNumber}`}
				trail={[
					{
						display: 'Writers',
						href: '/writers',
					},
					{
						display: novelData.writerDisplay,
						href: `/writers/${novelData.writerSlug}`,
					},
					{
						display: 'Novels',
						href: `/writers/${novelData.writerSlug}/novels`,
					},
					{
						display: novelData.titleDisplay,
						href: `/writers/${novelData.writerSlug}/novels/${novelData.titleSlug}`,
					},
				]}
			/>
			<h1>{title}</h1>
			<div className="flex flex-col gap-y-8 max-w-prose text-lg">
				{zeroIndexedChapter.content.map((paragraph, index) => (
					<p
						key={`${paragraph.slice(0, 10)}-${index}`} // Handle deliberate repeated paragraphs
						className="leading-9 md:text-justify"
					>
						{paragraph}
					</p>
				))}
			</div>
			<ChapterNavigation novelData={novelData} currentPage={currentChapterNumber} />
			<Footer currentNovel={novelData} />
		</>
	)
}
