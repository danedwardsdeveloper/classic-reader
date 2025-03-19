import BreadCrumbs from '@/components/BreadCrumbs'
import Footer from '@/components/Footer'
import BooksList from '@/components/NovelsList'
import { writers } from '@/library/constants'
import { metaTitleTemplate } from '@/library/environment'
import logger from '@/library/logger'
import { formatList, getWriterDisplayName, isWriterSlug } from '@/library/utilities/client'
import { getAllNovels } from '@/library/utilities/server'
import type { WriterSlug } from '@/types'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type ResolvedParams = { writer: string }
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { writer: writerSlug } = await params
	const allNovels = await getAllNovels()
	const writerDisplayName = getWriterDisplayName(writerSlug as WriterSlug)

	if (!isWriterSlug(writerSlug)) logger.error(`Invalid writer slug: ${writerSlug}`)

	const novelTitles = writerSlug ? allNovels.filter((book) => book.writerSlug === writerSlug).map((novel) => novel.titleDisplay) : []

	return {
		title: `Novels by ${writerDisplayName} | ${metaTitleTemplate}`,
		description: `Read novels by ${writerDisplayName} including ${formatList(novelTitles)}, for free on ClassicReader.org. `,
		alternates: {
			canonical: `/writers/${writerSlug}`,
		},
	}
}

export async function generateStaticParams(): StaticParams {
	return Object.keys(writers).map((writerSlug) => ({
		writer: writerSlug,
	}))
}

export default async function SpecificWriterPage({ params }: { params: Params }) {
	const { writer: writerSlug } = await params
	const allNovels = await getAllNovels()
	const filteredNovels = allNovels.filter((book) => book.writerSlug === writerSlug)
	const writerDisplayName = getWriterDisplayName(writerSlug as WriterSlug)

	if (!writerDisplayName || filteredNovels.length === 0) notFound()

	return (
		<>
			<BreadCrumbs currentPageName={writerDisplayName} trail={[{ display: 'Writers', href: '/writers' }]} />
			<h1>Works by {writerDisplayName}</h1>
			<Link href={`/writers/${writerSlug}/novels`}>
				<h2 className="link-primary">Novels</h2>
			</Link>
			<BooksList novels={filteredNovels} />
			<Footer />
		</>
	)
}
