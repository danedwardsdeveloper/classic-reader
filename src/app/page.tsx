import BooksList from '@/components/BooksList'
import Footer from '@/components/Footer'
import Menu from '@/components/Menu'
import { getAllBooks } from '@/library/books'

export default async function Home() {
	const books = await getAllBooks()

	return (
		<>
			<div className="flex-1 mb-32 md:mb-80 max-w-prose w-full mx-auto">
				<div className="flex flex-col w-full">
					<Menu />
					<BooksList books={books} />
				</div>
			</div>
			<Footer />
		</>
	)
}
