import { writerDetails } from '@/library/constants'
import Link from 'next/link'

// List of writers
export default function Page() {
	return (
		<>
			<h1>Writers</h1>
			<ul className="flex flex-col gap-y-3">
				{Object.values(writerDetails).map((writer) => (
					<li key={writer.slug}>
						<Link href={`/writers/${writer.slug}`} className="link-primary text-xl">
							{writer.display}
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}
