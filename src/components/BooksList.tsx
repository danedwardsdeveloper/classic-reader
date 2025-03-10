import { getAllBooks } from '@/library/books'
import Link from 'next/link'

export default async function BooksList() {
	const allBooks = await getAllBooks()

	return (
		<ul className="flex flex-col gap-y-6">
			{allBooks.map((bookData) => {
				if (!bookData) return null
				const slug = bookData.slug

				return (
					<li key={slug}>
						<Link href={`/books/${slug}`} className="link text-xl font-medium">
							{bookData.title}
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
