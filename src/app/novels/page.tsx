import BreadCrumbs from '@/components/BreadCrumbs'
import Footer from '@/components/Footer'
import BooksList from '@/components/NovelsList'
import { metaTitleTemplate } from '@/library/environment'
import { getAllNovels } from '@/library/utilities/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `All novels | ${metaTitleTemplate}`,
	description: 'Browse our collection of classic novels for free online reading without ads or distractions.',
	alternates: {
		canonical: '/novels',
	},
}

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
