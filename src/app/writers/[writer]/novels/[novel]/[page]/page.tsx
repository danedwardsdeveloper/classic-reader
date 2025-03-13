import ChapterNavigation from '@/components/ChapterNavigation'
import Footer from '@/components/Footer'
import { getAllBooks, getBookBySlug } from '@/library/books'
import { dynamicBaseURL } from '@/library/environment/publicVariables'
import { getAuthorSlugByDisplay } from '@/library/getAuthorSlug'
import type { Metadata } from 'next'

interface ResolvedParams {
	author: string
	novel: string
	page: string
}

type Params = Promise<ResolvedParams>

export async function generateStaticParams(): Promise<Array<ResolvedParams>> {
	const books = await getAllBooks()
	const params = []

	for (const book of books) {
		const authorSlug = getAuthorSlugByDisplay(book.author)
		if (authorSlug) {
			for (let i = 0; i < book.chapters.length; i++) {
				params.push({
					author: authorSlug,
					novel: book.slug,
					page: (i + 1).toString(),
				})
			}
		}
	}

	return params
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { author, page } = await params
	const bookData = await getBookBySlug(author)
	if (!bookData) return { title: 'Chapter not found' }

	return {
		title: `Chapter ${page} | ${bookData.title} by ${bookData.author}`,
		description: `Read chapter ${page} of ${bookData.title} by ${bookData.author} on Classic Reader - a simple website for reading classic books for free.`,
		alternates: {
			canonical: `${dynamicBaseURL}/books/${bookData.slug}/${page}`,
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
