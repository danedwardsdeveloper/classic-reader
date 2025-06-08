import BreadCrumbs from '@/components/BreadCrumbs'
import ChapterNavigation from '@/components/ChapterNavigation'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import logger from '@/library/logger'
import { generateChapterSchema } from '@/library/utilities/client'
import { generateChapterParam } from '@/library/utilities/client/definitions/generatePaths'
import { getAllNovels, getNovelBySlug } from '@/library/utilities/server'
import { optimiseDescription, optimiseTitle } from '@/library/utilities/server'
import type { Chapter, Novel } from '@/types'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface ResolvedParams {
	writer: string
	novel: string
	chapter: string
}
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

function getChapterByIndex(novel: Novel, zeroBasedIndex: number): Chapter | null {
	return novel.chapters[zeroBasedIndex] || null
}

function generatePageTitle(chapter: Chapter | null, chapterNumber: number): string {
	// If chapter has a name, use it. Otherwise fall back to "Chapter X"
	return chapter?.title || `Chapter ${chapterNumber}`
}

function generateMetaTitleOptions(chapterNumber: number, chapterName: string | null, novel: Novel): string[] {
	const baseOptions = [`Chapter ${chapterNumber} | ${novel.titleDisplay}`]

	if (chapterName) {
		baseOptions.unshift(
			`Chapter ${chapterNumber} | ${chapterName}`,
			`Chapter ${chapterNumber} | ${chapterName} - ${novel.titleDisplay}`,
			`Chapter ${chapterNumber} | ${chapterName} - ${novel.titleDisplay} by ${novel.writerDisplay}`,
		)
	}

	// Add the full version as fallback
	baseOptions.push(`Chapter ${chapterNumber} | ${novel.titleDisplay} by ${novel.writerDisplay}`)

	return baseOptions
}

function generateMetaDescriptionBase(chapterNumber: number, chapterName: string | null, novel: Novel): string {
	const chapterPart = chapterName ? `chapter ${chapterNumber}, ${chapterName},` : `chapter ${chapterNumber}`

	return `Read ${chapterPart} from ${novel.titleDisplay} by ${novel.writerDisplay}`
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

	const chapter = getChapterByIndex(novelData, currentChapterNumber - 1)
	const chapterName = chapter?.title || null

	const titleOptions = generateMetaTitleOptions(currentChapterNumber, chapterName, novelData)
	const descriptionBase = generateMetaDescriptionBase(currentChapterNumber, chapterName, novelData)

	return {
		title: optimiseTitle({
			baseOptions: titleOptions,
			additionalPhraseOptions: [
				'full', //
				'in full',
				'full text',
				'read the full text',
				'read the full text at ClassicReader.org',
			],
		}),
		description: optimiseDescription({
			base: descriptionBase,
			additionalPhraseOptions: [
				'.', //
				'without ads or distractions.',
				'without ads or distractions at ClassicReader.org.',
			],
		}),
		alternates: {
			canonical: `/writers/${writer}/novels/${novelSlug}/${chapterSlug}`,
		},
	}
}

export default async function ChapterPage({ params }: { params: Params }) {
	const { novel, chapter: chapterSlug } = await params
	const currentChapterNumber = Number(chapterSlug.split('-')[1])

	const novelData = await getNovelBySlug(novel)
	if (!novelData) return notFound()

	const zeroIndexedChapter = novelData.chapters[currentChapterNumber - 1]
	if (!zeroIndexedChapter) return notFound()

	const title = generatePageTitle(zeroIndexedChapter, currentChapterNumber)

	return (
		<>
			<StructuredData data={generateChapterSchema(novelData, currentChapterNumber - 1, chapterSlug)} />
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
			<div className="flex flex-col gap-y-8 max-w-prose text-lg text-zinc-800">
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
