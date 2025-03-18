import BreadCrumbs from '@/components/BreadCrumbs'
import Footer from '@/components/Footer'
import { writers } from '@/library/constants'
import { metaTitleTemplate } from '@/library/environment'
import { getAllNovels } from '@/library/utilities/server'
import type { WriterSlug } from '@/types'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: `About ${metaTitleTemplate}`,
	alternates: {
		canonical: '/writers',
	},
}

// List of writers
export default async function Page() {
	const allNovels = await getAllNovels()
	const writersWithNovels = new Set(allNovels.map((novel) => novel.writerSlug))

	return (
		<>
			<BreadCrumbs currentPageName="Writers" homeOnly />
			<h1>Writers</h1>
			<ul className="flex flex-col gap-y-3">
				{Object.entries(writers)
					.filter(([slug, _]) => writersWithNovels.has(slug as WriterSlug))
					.sort((a, b) => a[0].localeCompare(b[0]))
					.map(([slug, display]) => (
						<li key={slug}>
							<Link href={`/writers/${slug}`} className="link-primary text-xl">
								{display}
							</Link>
						</li>
					))}
			</ul>
			<Footer />
		</>
	)
}
