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
			<div className="flex-1 max-w-prose w-full mx-auto">
				<div className="flex flex-col w-full">
					<div className="flex flex-col gap-y-6">
						<div className="text-lg mb-20">
							<p className="mb-6">
								ClassicReader.org is a website that allows you to read classic novels in the browser without any distractions.
							</p>
							<p>
								{`It's completely free and sustained solely by generous donations from readers like you. `}
								<Link href="/about" className="link-primary">
									Find out more.
								</Link>
							</p>
						</div>
						<h2>Novels</h2>
						<NovelsList novels={novels} />
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
