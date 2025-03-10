import ChapterList from '@/components/ChapterList'
import Menu from '@/components/Menu'
import { getAllBooks, getBookBySlug } from '@/library/books'
import type { Metadata } from 'next'

export async function generateStaticParams() {
	const books = await getAllBooks()
	return books.map((book) => ({
		slug: book.slug,
	}))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params
	const bookData = await getBookBySlug(slug)

	if (!bookData) {
		return {
			title: 'Book not found',
		}
	}

	return {
		title: `${bookData.title} by ${bookData.author}`,
	}
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const bookData = await getBookBySlug(slug)
	if (!bookData) return null

	return (
		<>
			<Menu author={bookData.author} />
			<h1>{bookData.title}</h1>
			<ChapterList book={bookData} />
		</>
	)
}
