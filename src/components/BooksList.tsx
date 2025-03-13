'use client'
import { getAuthorSlugByDisplay } from '@/library/getAuthorSlug'
import { hasProgress } from '@/library/hasProgress'
import { useLocalStorage } from '@/providers/localStorage'
import type { Book } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'
import Spinner from './Spinner'

export default function BooksList({ books }: { books: Book[] }) {
	const { isLoading, getBookChapters } = useLocalStorage()

	if (isLoading) return <Spinner />

	return (
		<ul className="flex flex-col gap-y-6 divide-y-2">
			{books.map((bookData) => {
				if (!bookData) return null
				const novelSlug = bookData.slug
				const authorSlug = getAuthorSlugByDisplay(bookData.author)

				const localStorageData = getBookChapters(bookData.slug)
				const hasBeenRead = hasProgress(localStorageData)

				return (
					<li key={novelSlug}>
						<div className="flex flex-col p-3 w-full first:mt-0 mt-6">
							<span className="text-xl text-zinc-800 font-medium">{bookData.title}</span>
							<span className="text-lg text-zinc-700">{bookData.author}</span>
							<div>
								<Link
									href={hasBeenRead ? '' : `/novels/${authorSlug}/${novelSlug}/1`}
									className={clsx('', hasBeenRead ? 'text-orange-500' : 'text-blue-500')}
								>
									{hasBeenRead ? 'Continue reading...' : 'Read...'}
								</Link>
							</div>
						</div>
					</li>
				)
			})}
		</ul>
	)
}
