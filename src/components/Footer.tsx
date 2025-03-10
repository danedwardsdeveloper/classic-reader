import type { Book } from '@/types'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Footer({ currentBook }: { currentBook?: Book }) {
	// ToDo: set up Ko-Fi and add links
	return (
		<ul className="flex flex-col md:flex-row w-full items-end gap-y-3 md:justify-between">
			<li>
				<Link href="/" className="link flex gap-x-1 items-center">
					Make a donation
					<ArrowUpRightIcon className="size-4" />
				</Link>
			</li>
			<li>
				<Link href="/" className="link">
					Add a book
				</Link>
			</li>
			{currentBook && (
				<li>
					<Link
						href={`https://github.com/danedwardsdeveloper/classic-reader/blob/main/src/library/books/data/${currentBook.slug}.ts`}
						target="_blank"
						rel="noopener noreferrer"
						className="link flex gap-x-1 items-center"
					>
						{`Edit ${currentBook.title} on GitHub`}
						<ArrowUpRightIcon className="size-4" />
					</Link>
				</li>
			)}
			<li>
				<Link href="/about" className="link">
					About
				</Link>
			</li>
			<li>
				<Link href="/cookie-policy" className="link">
					Cookie policy
				</Link>
			</li>
			<li className="flex gap-x-1">
				<span>Site by </span>
				<Link href="https://danedwardsdeveloper.com/" className="flex gap-x-1 items-center link">
					Dan Edwards
					<ArrowUpRightIcon className="size-4" />
				</Link>
			</li>
		</ul>
	)
}
