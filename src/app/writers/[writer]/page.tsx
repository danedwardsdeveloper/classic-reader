import Footer from '@/components/Footer'
import BooksList from '@/components/NovelsList'
import { writerDetails } from '@/library/constants'
import { getAllNovels } from '@/library/getAllNovels'
import { notFound } from 'next/navigation'

type ResolvedParams = { writer: string }
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

export async function generateStaticParams(): StaticParams {
	return Object.keys(writerDetails).map((authorKey) => ({
		writer: authorKey,
	}))
}

// All novels, poems & plays by one writer
export default async function WriterPage({ params }: { params: Params }) {
	const { writer } = await params
	const allNovels = await getAllNovels()
	const writerEntry = Object.entries(writerDetails).find(([slug, _]) => slug === writer)

	const writerDisplayName = writerEntry ? writerEntry[1] : null

	const filteredNovels = writerDisplayName ? allNovels.filter((book) => book.writer === writerDisplayName) : []

	if (filteredNovels.length === 0) notFound()

	return (
		<>
			<div className="flex-1 max-w-prose w-full mx-auto">
				<div className="flex flex-col w-full">
					<h1>Works by {writerDisplayName}</h1>
					<h2>Novels</h2>
					<BooksList novels={filteredNovels} />
					{/* Poems list */}
					{/* Plays list */}
				</div>
			</div>
			<Footer />
		</>
	)
}
