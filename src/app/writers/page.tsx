import { authors } from '@/library/constants'
import Link from 'next/link'

// List of writers
export default function Page() {
	return (
		<>
			<h1>Writers</h1>
			<ul className="flex flex-col gap-y-3">
				{Object.values(authors).map((author) => (
					<li key={author.slug}>
						<Link href={`/writers/${author.slug}`} className="link-primary text-xl">
							{author.display}
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}
