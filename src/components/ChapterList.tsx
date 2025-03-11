'use client'
import { useLocalStorage } from '@/providers/localStorage'
import type { Book } from '@/types'
import Link from 'next/link'
import Spinner from './Spinner'

export default function ChapterList({ book }: { book: Book }) {
	const { isLoading, getBookChapters, toggleChapter } = useLocalStorage()
	const checkedChapters = getBookChapters(book.slug)

	if (isLoading) return <Spinner />

	return (
		<ul className="flex flex-col gap-y-6">
			{book.chapters.map((chapter, index) => (
				<li key={chapter[0]} className="flex gap-x-2 items-center">
					<input
						type="checkbox"
						checked={!!checkedChapters[index]}
						onChange={() => toggleChapter(book.slug, index)}
						className="size-6 bg-gray-100 border-gray-300 rounded focus:ring-2 transition duration-300 text-blue-600 focus:ring-orange-400 hover:bg-blue-200"
						aria-label={`Mark Chapter ${index + 1} as read`}
					/>
					<Link href={`/books/${book.slug}/${index + 1}`} className="link text-lg">
						Chapter {index + 1}
					</Link>
				</li>
			))}
		</ul>
	)
}
