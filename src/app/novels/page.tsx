import Footer from '@/components/Footer'
import BooksList from '@/components/NovelsList'
import { getAllNovels } from '@/library/getAllNovels'

export default async function AllBooksPage() {
	const novels = await getAllNovels()

	return (
		<>
			<div className="flex-1 max-w-prose w-full mx-auto">
				<BooksList novels={novels} />
			</div>
			<Footer />
		</>
	)
}
