import BreadCrumbs from '@/components/BreadCrumbs'
import Footer from '@/components/Footer'
import NovelsList from '@/components/NovelsList'
import { getAllNovels } from '@/library/utilities/server'
import Link from 'next/link'

export default async function Home() {
	const novels = await getAllNovels()
	return (
		<>
			<BreadCrumbs isHomePage />
			<div className="flex-1 flex-col max-w-prose w-full mx-auto">
				<p className="text-lg mb-20 text-balance">
					ClassicReader.org allows you to read classic novels in the browser without any distractions.{' '}
					<Link href="/about" className="link-primary">
						Find out more.
					</Link>
				</p>
				<h2>Novels</h2>
				<NovelsList novels={novels} />
			</div>
			<Footer />
		</>
	)
}
