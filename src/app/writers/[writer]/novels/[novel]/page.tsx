import ChaptersList from '@/components/ChaptersList'
import Footer from '@/components/Footer'
import { getAllBooks, getBookBySlug } from '@/library/books'
import { getWriterSlugByDisplay } from '@/library/getWriterSlugByDisplay'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type ResolvedParams = { writer: string; novel: string }
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

export async function generateStaticParams(): StaticParams {
	const books = await getAllBooks()
	const params = books
		.map((book) => {
			const writerSlug = getWriterSlugByDisplay(book.writer)
			if (!writerSlug) return null

			return {
				writer: writerSlug,
				novel: book.slug,
			}
		})
		.filter(Boolean) as ResolvedParams[]

	return params
}

// Landing page for a novel
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { novel } = await params
	const bookData = await getBookBySlug(novel)

	if (!bookData) {
		return {
			title: 'Book not found',
		}
	}

	return {
		title: `${bookData.title} by ${bookData.writer}`,
	}
}

export default async function Page({ params }: { params: Params }) {
	const { novel } = await params
	const bookData = await getBookBySlug(novel)
	if (!bookData) return notFound()

	return (
		<>
			<div className="flex-1 flex flex-col  max-w-prose w-full mx-auto">
				<h1>
					{bookData.title} by {bookData.writer}
				</h1>
				<ChaptersList book={bookData} />
			</div>
			<Footer currentBook={bookData} />
		</>
	)
}
