import Footer from '@/components/Footer'
import BooksList from '@/components/NovelsList'
import { getAllBooks } from '@/library/books'
import { writerDetails } from '@/library/constants'
import { notFound } from 'next/navigation'

type ResolvedParams = { writer: string }
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

export async function generateStaticParams(): StaticParams {
	return Object.keys(writerDetails).map((authorKey) => ({
		writer: writerDetails[authorKey as keyof typeof writerDetails].slug,
	}))
}

// All novels by a particular writer
export default async function WriterPage({ params }: { params: Params }) {
	const { writer } = await params
	const allBooks = await getAllBooks()
	const authorEntry = Object.entries(writerDetails).find(([_, authorData]) => authorData.slug === writer)

	const authorDisplayName = authorEntry ? authorEntry[1].display : null

	const filteredBooks = authorDisplayName ? allBooks.filter((book) => book.writer === authorDisplayName) : []

	if (filteredBooks.length === 0) notFound()

	return (
		<>
			<div className="flex-1 max-w-prose w-full mx-auto">
				<div className="flex flex-col w-full">
					<h1>Novels by {authorDisplayName}</h1>
					<BooksList books={filteredBooks} />
				</div>
			</div>
			<Footer />
		</>
	)
}
