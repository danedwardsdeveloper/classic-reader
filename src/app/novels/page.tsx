import Footer from '@/components/Footer'
import BooksList from '@/components/NovelsList'
import { getAllBooks } from '@/library/books'

export default async function AllBooksPage() {
	const books = await getAllBooks()

	return (
		<>
			<div className="flex-1 max-w-prose w-full mx-auto">
				<div className="flex flex-col w-full">
					<BooksList books={books} />
				</div>
			</div>
			<Footer />
		</>
	)
}
