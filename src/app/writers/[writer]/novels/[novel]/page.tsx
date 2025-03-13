import ChaptersList from '@/components/ChaptersList'
import Footer from '@/components/Footer'
import { getAllBooks, getBookBySlug } from '@/library/books'
import { authors } from '@/library/constants'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type UnwrappedParams = { writer: string; novel: string }
type Params = Promise<UnwrappedParams>

// Main ToDo: Get this working
export async function generateStaticParams(): Promise<UnwrappedParams[]> {
	const books = await getAllBooks()

	const paramsWithNulls = await Promise.all(
		books.map(async (book) => {
			const fullBookDetails = await getBookBySlug(book.slug)
			if (!fullBookDetails) return null
			const authorEntry = Object.values(authors).find((a) => a.display === book.author)
			if (!authorEntry) return null
			return {
				writer: authorEntry.slug,
				novel: fullBookDetails.slug,
			}
		}),
	)
	return paramsWithNulls.filter(Boolean) as UnwrappedParams[]
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
		title: `${bookData.title} by ${bookData.author}`,
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
					{bookData.title} by {bookData.author}
				</h1>
				<ChaptersList book={bookData} />
			</div>
			<Footer currentBook={bookData} />
		</>
	)
}
