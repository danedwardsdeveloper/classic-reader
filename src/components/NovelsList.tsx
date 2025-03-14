'use client'
import { getSlugFromDisplay } from '@/library/getSlugFromDisplay'
import { hasProgress } from '@/library/hasProgress'
import { useLocalStorage } from '@/providers/localStorage'
import type { Novel } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'
import Spinner from './Spinner'

export default function NovelsList({ novels }: { novels: Novel[] }) {
	const { isLoading, getBookChapters } = useLocalStorage()

	if (isLoading) return <Spinner />

	return (
		<ul className="flex flex-col gap-y-8 divide-y-2">
			{novels.map((bookData, index) => {
				if (!bookData) return null
				const novelSlug = bookData.slug
				const writerSlug = getSlugFromDisplay(bookData.writer)

				const localStorageData = getBookChapters(bookData.slug)
				const hasBeenRead = hasProgress(localStorageData)

				// Has been finished?

				// ToDo: link to most recent chapter

				const tempLink = `/writers/${writerSlug}/novels/${novelSlug}/1`

				return (
					<li key={novelSlug}>
						<div className={clsx('flex flex-col gap-y-3 w-full', index !== 0 && 'mt-4')}>
							<div className="flex gap-x-2">
								<span className="text-xl text-zinc-800 font-medium">{bookData.title}</span>
								<span className="text-lg text-zinc-700">{bookData.writer}</span>
							</div>
							<div className="flex gap-x-2">
								<Link href={hasBeenRead ? tempLink : tempLink} className={clsx(hasBeenRead ? 'text-orange-600' : 'text-blue-600')}>
									{hasBeenRead ? 'Continue reading...' : 'Read...'}
								</Link>
								<Link href={`/writers/${writerSlug}/novels/${novelSlug}`} className="link-primary">
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
