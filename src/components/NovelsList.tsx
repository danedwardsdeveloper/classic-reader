'use client'
import { generateChapterPath, generateNovelPath } from '@/library/utilities/client/definitions/generatePaths'
import { useLocalStorage } from '@/providers/localStorage'
import type { Novel } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'

export default function NovelsList({ novels }: { novels: Novel[] }) {
	const { getBookChapters, getNovelProgress, getNextUnreadChapter } = useLocalStorage()

	return (
		<ul className="flex flex-col gap-y-8 divide-y-2 divide-zinc-100">
			{novels.map((novelData, index) => {
				if (!novelData) return null

				const localStorageData = getBookChapters(novelData.titleSlug)
				const hasProgress = getNovelProgress(localStorageData)
				const nextUnreadChapter = getNextUnreadChapter(novelData.titleSlug, novelData.chapters.length)
				const nextChapterPath = generateChapterPath({
					novelData: novelData,
					oneIndexedChapterNumber: nextUnreadChapter || 1,
				})
				const progressPath = generateNovelPath(novelData)
				const isFinished = nextUnreadChapter === null

				return (
					<li key={novelData.titleSlug}>
						<div className={clsx('flex flex-col gap-y-2 w-full', index !== 0 && 'mt-6')}>
							<div className="flex w-full justify-between">
								<span className="text-xl text-zinc-800 font-medium">{novelData.titleDisplay}</span>
								<span className="text-lg text-zinc-700">{novelData.writerDisplay}</span>
							</div>
							<div className="flex w-full justify-between">
								{isFinished ? (
									<p className="text-green-600">Finished</p>
								) : (
									<Link
										href={nextChapterPath}
										className={clsx(
											'link',
											hasProgress
												? 'text-orange-600 hover:text-orange-500 active:text-orange-400'
												: 'text-blue-600 hover:text-blue-500 active:text-blue-400',
										)}
									>
										{hasProgress ? `Continue at chapter ${nextUnreadChapter}` : 'Read...'}
									</Link>
								)}
								<Link href={progressPath} className="link-primary">
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
