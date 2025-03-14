import ChapterNavigation from '@/components/ChapterNavigation'
import Footer from '@/components/Footer'
import { getAllBooks, getBookBySlug } from '@/library/books'
import { dynamicBaseURL } from '@/library/environment/publicVariables'
import { getWriterSlugByDisplay } from '@/library/getWriterSlugByDisplay'
import type { Metadata } from 'next'

interface ResolvedParams {
	writer: string
	novel: string
	page: string
}
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

export async function generateStaticParams(): StaticParams {
	const books = await getAllBooks()
	const params = []

	for (const book of books) {
		const writerSlug = getWriterSlugByDisplay(book.writer)
		if (writerSlug) {
			for (let i = 0; i < book.chapters.length; i++) {
				params.push({
					writer: writerSlug,
					novel: book.slug,
					page: (i + 1).toString(),
				})
			}
		}
	}

	return params
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { writer, page, novel } = await params
	const bookData = await getBookBySlug(novel)
	if (!bookData) return { title: 'Chapter not found' }

	return {
		title: `Chapter ${page} | ${bookData.title} by ${bookData.writer}`,
		description: `Read chapter ${page} of ${bookData.title} by ${bookData.writer} on Classic Reader - a simple website for reading classic books for free.`,
		alternates: {
			canonical: `${dynamicBaseURL}/writers/${writer}/novels/${novel}/${page}`,
		},
	}
}

export default async function Page({ params }: { params: Params }) {
	const { novel, page } = await params
	const currentPage = Number.parseInt(page, 10)
	const bookData = await getBookBySlug(novel)
	if (!bookData) return null

	return (
		<>
			<h1>Chapter {currentPage}</h1>
			<div className="flex flex-col gap-y-8 max-w-prose text-lg">
				{bookData.chapters[currentPage - 1].map((paragraph, index) => (
					// Handle deliberate repeated lines
					<p key={`${paragraph.slice(0, 10)}-${index}`} className="leading-9 md:text-justify">
						{paragraph}
					</p>
				))}
			</div>
			<ChapterNavigation bookData={bookData} currentPage={currentPage} />
			<Footer currentBook={bookData} />
		</>
	)
}
