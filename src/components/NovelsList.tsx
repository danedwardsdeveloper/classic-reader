'use client'
import { getSlugFromDisplay } from '@/library/getSlugFromDisplay'
import { hasProgress } from '@/library/hasProgress'
import { useLocalStorage } from '@/providers/localStorage'
import type { Novel } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'

export default function NovelsList({ novels }: { novels: Novel[] }) {
	const { getBookChapters, getNextUnreadChapter } = useLocalStorage()

	return (
		<ul className="flex flex-col gap-y-8 divide-y-2 divide-zinc-100">
			{novels.map((bookData, index) => {
				if (!bookData) return null
				const novelSlug = bookData.slug
				const writerSlug = getSlugFromDisplay(bookData.writer)

				const localStorageData = getBookChapters(bookData.slug)
				const hasBeenRead = hasProgress(localStorageData)

				const nextUnreadChapter = getNextUnreadChapter(novelSlug, bookData.chapters.length)

				const isFinished = nextUnreadChapter === null

				return (
					<li key={novelSlug}>
						<div className={clsx('flex flex-col gap-y-2 w-full', index !== 0 && 'mt-6')}>
							<div className="flex w-full justify-between">
								<span className="text-xl text-zinc-800 font-medium">{bookData.title}</span>
								<span className="text-lg text-zinc-700">{bookData.writer}</span>
							</div>
							<div className="flex w-full justify-between">
								{isFinished ? (
									<p className="text-green-600">Finished</p>
								) : (
									<Link
										href={`/writers/${writerSlug}/novels/${novelSlug}/${hasBeenRead ? nextUnreadChapter : '1'}`}
										className={clsx(
											'link',
											hasBeenRead
												? 'text-orange-600 hover:text-orange-500 active:text-orange-400'
												: 'text-blue-600 hover:text-blue-500 active:text-blue-400',
										)}
									>
										{hasBeenRead ? `Continue at chapter ${nextUnreadChapter}` : 'Read...'}
									</Link>
								)}
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
