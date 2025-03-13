import type { Book } from '@/types'
import Link from 'next/link'

export default function Menu() {
	return (
		<nav className="w-full flex flex-col mb-16">
			<Link href="/" className="link text-xl">
				Classic Reader
			</Link>
		</nav>
	)
}

export function BookHeader({ book }: { book: Book }) {
	return (
		<div className="w-full flex flex-col gap-y-2 md:flex-row justify-between mt-10">
			<Link href={`/books/${book.slug}`} className="text-lg link">
				{book.title.toUpperCase()}
			</Link>
			<span className="text-lg text-zinc-600">{book.author.toUpperCase()}</span>
		</div>
	)
}
