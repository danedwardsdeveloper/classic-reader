import Footer from '@/components/Footer'
import NovelsList from '@/components/NovelsList'
import { getAllNovels } from '@/library/getAllNovels'

export default async function Home() {
	const novels = await getAllNovels()

	return (
		<>
			<div className="flex-1 max-w-prose w-full mx-auto">
				<div className="flex flex-col w-full">
					<div className="flex flex-col gap-y-6">
						<p className="text-lg">ClassicReader.org is a website for reading classic novels.</p>
						<ul className="flex flex-col gap-y-3 list-disc list-inside marker:text-zinc-400 text-lg mb-12">
							<li>Distraction-free reading</li>
							<li>Saves your progress without using cookies</li>
							<li>Add, request or edit the collection on GitHub </li>
							<li>Sustained solely by generous donations from readers like you</li>
						</ul>
						<h2>Novels</h2>
						<NovelsList novels={novels} />
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
