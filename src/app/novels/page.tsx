import BreadCrumbs from '@/components/BreadCrumbs'
import Footer from '@/components/Footer'
import BooksList from '@/components/NovelsList'
import { getAllNovels } from '@/library/utilities/server'

export default async function AllBooksPage() {
	const novels = await getAllNovels()

	return (
		<>
			<BreadCrumbs homeOnly currentPageName="Novels" />
			<BooksList novels={novels} />
			<Footer />
		</>
	)
}
