import BreadCrumbs from '@/components/BreadCrumbs'
import Footer from '@/components/Footer'
import NotFoundComponent from '@/components/NotFound'
import NovelsList from '@/components/NovelsList'
import { getAllNovels } from '@/library/utilities/server'

export default async function DefaultNotFoundPage() {
	const novels = await getAllNovels()

	return (
		<>
			<BreadCrumbs homeOnly currentPageName="Not found" />
			<div className="flex-1 max-w-prose w-full mx-auto">
				<div className="flex flex-col w-full">
					<NotFoundComponent />
					<div className="flex flex-col gap-y-6">
						<h2>Novels</h2>
						<NovelsList novels={novels} />
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
