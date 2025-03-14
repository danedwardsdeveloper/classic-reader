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
		writer: writerDetails[authorKey as keyof typeof writerDetails],
	}))
}

// All novels by a particular writer
export default async function WriterPage({ params }: { params: Params }) {
	const { writer } = await params
	const allNovels = await getAllNovels()
	const writerEntry = Object.entries(writerDetails).find(([_, writerData]) => writerData === writer)

	const writerDisplayName = writerEntry ? writerEntry[1] : null

	const filteredNovels = writerDisplayName ? allNovels.filter((book) => book.writer === writerDisplayName) : []

	if (filteredNovels.length === 0) notFound()

	return (
		<>
			<div className="flex-1 max-w-prose w-full mx-auto">
				<div className="flex flex-col w-full">
					<h1>Novels by {writerDisplayName}</h1>
					<BooksList novels={filteredNovels} />
				</div>
			</div>
			<Footer />
		</>
	)
}
