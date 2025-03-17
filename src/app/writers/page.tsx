import BreadCrumbs from '@/components/BreadCrumbs'
import { writerDetails } from '@/library/constants'
import Link from 'next/link'

// List of writers
export default function Page() {
	return (
		<>
			<BreadCrumbs currentPageName="Writers" homeOnly />
			<h1>Writers</h1>
			<ul className="flex flex-col gap-y-3">
				{Object.entries(writerDetails).map(([slug, display]) => (
					<li key={slug}>
						<Link href={`/writers/${slug}`} className="link-primary text-xl">
							{display}
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}
