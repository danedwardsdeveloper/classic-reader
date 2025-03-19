import BreadCrumbs from '@/components/BreadCrumbs'
import ChaptersList from '@/components/ChaptersList'
import Footer from '@/components/Footer'
import { metaTitleTemplate } from '@/library/environment'
import { generateNovelPath } from '@/library/utilities/client'
import { getAllNovels, getNovelBySlug } from '@/library/utilities/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type ResolvedParams = { writer: string; novel: string }
export type NovelPageParams = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

export async function generateStaticParams(): StaticParams {
	const novels = await getAllNovels()
	return novels.map((index) => {
		return {
			writer: index.writerSlug,
			novel: index.titleSlug,
		}
	})
}

export async function generateMetadata({ params }: { params: NovelPageParams }): Promise<Metadata> {
	const { novel } = await params
	const novelData = await getNovelBySlug(novel)
	if (!novelData) return { title: 'Book not found' }

	return {
		title: `${novelData.titleDisplay} by ${novelData.writerDisplay} | ${metaTitleTemplate}`,
		description: `Chapters list for ${novelData.titleDisplay} by ${novelData.writerDisplay}, on Classic Reader - a simple website for reading classic books for free.`,
		alternates: {
			canonical: generateNovelPath(novelData),
		},
	}
}

export default async function NovelOverviewPage({ params }: { params: NovelPageParams }) {
	const { novel } = await params
	const novelData = await getNovelBySlug(novel)
	if (!novelData) return notFound()

	return (
		<>
			<BreadCrumbs
				currentPageName={novelData.titleDisplay}
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
				]}
			/>
			<h1>
				{novelData.titleDisplay} by {novelData.writerDisplay}
			</h1>
			<ChaptersList novel={novelData} />
			<Footer currentNovel={novelData} />
		</>
	)
}
