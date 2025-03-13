'use client'
import { getAuthorSlugByDisplay } from '@/library/getAuthorSlug'
import { hasProgress } from '@/library/hasProgress'
import { useLocalStorage } from '@/providers/localStorage'
import type { Book } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'
import Spinner from './Spinner'

export default function NovelsList({ books }: { books: Book[] }) {
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

				// Has been finished?

				// ToDo: link to most recent chapter

				const tempLink = `/writers/${authorSlug}/novels/${novelSlug}/1`

				return (
					<li key={novelSlug}>
						<div className="flex flex-col gap-y-3 w-full first:mt-0 mt-6">
							<div className="flex gap-x-2">
								<span className="text-xl text-zinc-800 font-medium">{bookData.title}</span>
								<span className="text-lg text-zinc-700">{bookData.author}</span>
							</div>
							<div className="flex gap-x-2">
								<Link href={hasBeenRead ? tempLink : tempLink} className={clsx(hasBeenRead ? 'text-orange-600' : 'text-blue-600')}>
									{hasBeenRead ? 'Continue reading...' : 'Read...'}
								</Link>
								<Link href={`/writers/${authorSlug}/novels/${novelSlug}`} className="link-primary">
									Manage progress
								</Link>
							</div>
						</div>
					</li>
				)
			})}
		</ul>
	)
}
