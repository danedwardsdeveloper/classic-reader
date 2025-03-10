import ChapterNavigation from '@/components/ChapterNavigation'
import Menu from '@/components/Menu'
import { getAllBooks, getBookBySlug } from '@/library/books'
import type { Metadata } from 'next'

interface Params {
	slug: string
	page: string
}

export async function generateStaticParams(): Promise<Array<Params>> {
	const books = await getAllBooks()
	const params = []

	for (const book of books) {
		for (let i = 0; i < book.chapters.length; i++) {
			params.push({
				slug: book.slug,
				page: (i + 1).toString(),
			})
		}
	}

	return params
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
	const { slug, page } = await params
	const bookData = await getBookBySlug(slug)
	if (!bookData) return { title: 'Chapter not found' }

	return {
		title: `Chapter ${page} | ${bookData.title} by ${bookData.author}`,
	}
}

export default async function Page({ params }: { params: Promise<Params> }) {
	const { slug, page } = await params
	const currentPage = Number.parseInt(page, 10)
	const bookData = await getBookBySlug(slug)
	if (!bookData) return null

	return (
		<>
			<Menu author={bookData.author} bookName={bookData.title} />

			<h1>Chapter {currentPage}</h1>
			<div className="flex flex-col gap-y-8 max-w-prose text-lg">
				{bookData.chapters[currentPage - 1].map((paragraph) => (
					<p key={paragraph} className="leading-9 md:text-justify">
						{paragraph}
					</p>
				))}
			</div>
			<ChapterNavigation bookData={bookData} currentPage={currentPage} />
		</>
	)
}
