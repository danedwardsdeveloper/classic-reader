'use client'
import { hasProgress } from '@/library/hasProgress'
import { useLocalStorage } from '@/providers/localStorage'
import type { Book } from '@/types'
import Link from 'next/link'
import Spinner from './Spinner'

export default function BooksList({ books }: { books: Book[] }) {
	const { isLoading, getBookChapters } = useLocalStorage()

	if (isLoading) return <Spinner />

	return (
		<ul className="flex flex-col gap-y-6">
			{books.map((bookData) => {
				if (!bookData) return null
				const slug = bookData.slug
				const localStorageData = getBookChapters(bookData.slug)
				const hasBeenRead = hasProgress(localStorageData)

				return (
					<li key={slug}>
						<div className="flex flex-col p-3 w-full border-2 rounded-lg border-zinc-300">
							<span className="text-xl text-zinc-800 font-medium">{bookData.title}</span>
							<span className="text-lg text-zinc-700">{bookData.author}</span>
							<div>
								<Link href={hasBeenRead ? '' : `/books/${slug}/1`} className="link">
									{hasBeenRead ? 'Continue reading...' : 'Read'}
								</Link>
							</div>
						</div>
					</li>
				)
			})}
		</ul>
	)
}
