import BreadCrumbs from '@/components/BreadCrumbs'
import Footer from '@/components/Footer'
import BooksList from '@/components/NovelsList'
import { writers } from '@/library/constants'
import { getWriterDisplayName } from '@/library/utilities/client/definitions/getWriterDisplayName'
import { getAllNovels } from '@/library/utilities/server'
import type { WriterSlug } from '@/types'
import { notFound } from 'next/navigation'

// All novels by a particular writer

type ResolvedParams = { writer: string }
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

// ToDo: generate metadata

export async function generateStaticParams(): StaticParams {
	return Object.keys(writers).map((authorKey) => ({
		writer: authorKey,
	}))
}

export default async function WriterPage({ params }: { params: Params }) {
	const { writer: writerSlug } = await params
	const allNovels = await getAllNovels()
	const writerDisplayName = getWriterDisplayName(writerSlug as WriterSlug)
	const filteredNovels = writerSlug ? allNovels.filter((book) => book.writerSlug === writerSlug) : []

	if (!writerDisplayName || filteredNovels.length === 0) notFound()

	return (
		<>
			<BreadCrumbs
				currentPageName="Novels"
				trail={[
					{ display: 'Writers', href: '/writers' },
					{ display: writerDisplayName, href: `/writers/${writerSlug}` },
				]}
			/>
			<h1>Novels by {writerDisplayName}</h1>
			<BooksList novels={filteredNovels} />
			<Footer />
		</>
	)
}
