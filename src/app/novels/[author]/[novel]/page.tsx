import ChapterList from '@/components/ChapterList'
import Footer from '@/components/Footer'
import Menu from '@/components/Menu'
import { getAllBooks, getBookBySlug } from '@/library/books'
import type { Metadata } from 'next'

export async function generateStaticParams() {
	const books = await getAllBooks()
	return books.map((book) => ({
		slug: book.slug,
	}))
}

type Params = Promise<{ novel: string; author: string }>

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
	if (!bookData) return null

	return (
		<>
			<Menu />
			<div className="flex-1 flex flex-col  max-w-prose w-full mx-auto">
				<ChapterList book={bookData} />
			</div>
			<Footer currentBook={bookData} />
		</>
	)
}
