import BooksList from '@/components/BooksList'
import Footer from '@/components/Footer'
import Menu from '@/components/Menu'
import { getAllBooks } from '@/library/books'
import { authors } from '@/library/constants'
import { notFound } from 'next/navigation'

type Params = Promise<{ author: string }>

export default async function AllBooksPage({ params }: { params: Params }) {
	const { author } = await params
	const allBooks = await getAllBooks()
	const authorEntry = Object.entries(authors).find(([_, authorData]) => authorData.slug === author)

	const authorDisplayName = authorEntry ? authorEntry[1].display : null

	const filteredBooks = authorDisplayName ? allBooks.filter((book) => book.author === authorDisplayName) : []

	if (filteredBooks.length === 0) notFound()

	return (
		<>
			<div className="flex-1 max-w-prose w-full mx-auto">
				<div className="flex flex-col w-full">
					<Menu />
					<BooksList books={filteredBooks} />
				</div>
			</div>
			<Footer />
		</>
	)
}
