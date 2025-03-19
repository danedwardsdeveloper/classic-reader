'use client'
import { generateChapterPath, generateNovelPath, generateWriterPath } from '@/library/utilities/client/definitions/generatePaths'
import { useLocalStorage } from '@/providers/localStorage'
import type { Novel } from '@/types'
import { ArrowRightCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import AnimatedEllipsis from './AnimatedEllipsis'

export default function NovelsList({ novels }: { novels: Novel[] }) {
	const { getBookChapters, getNovelProgress, getNextUnreadChapter, isLoading } = useLocalStorage()

	function DynamicChapterLink({
		isFinished,
		hasProgress,
		nextChapterPath,
		nextUnreadChapterNumber,
	}: { isFinished: boolean; hasProgress: boolean; nextChapterPath: string; nextUnreadChapterNumber: number | null }) {
		if (isLoading)
			return (
				<p className="text-zinc-600 italic">
					Loading progress
					<AnimatedEllipsis />
				</p>
			)

		if (isFinished)
			return (
				<div className="text-green-600 flex items-center gap-x-2">
					<p>Finished</p>
					<CheckCircleIcon className="size-5" />
				</div>
			)
		if (hasProgress) {
			return (
				<Link
					href={nextChapterPath}
					className="flex items-center gap-x-2 link text-orange-700 hover:text-orange-600 active:text-orange-500"
				>
					<p>Continue at chapter {nextUnreadChapterNumber}</p>
					<ArrowRightCircleIcon className="size-5" />
				</Link>
			)
		}

		return (
			<Link href={nextChapterPath} className="link-primary">
				Start reading
			</Link>
		)
	}

	return (
		<ul className="flex flex-col gap-y-14 divide-y-2 divide-zinc-100">
			{novels.map((novelData) => {
				if (!novelData) return null

				const localStorageData = getBookChapters(novelData.titleSlug)
				const hasProgress = getNovelProgress(localStorageData)

				const nextUnreadChapterNumber = getNextUnreadChapter(novelData.titleSlug, novelData.chapters.length)

				const nextChapterPath = generateChapterPath({
					novelData: novelData,
					oneIndexedChapterNumber: nextUnreadChapterNumber || 1,
				})

				const isFinished = nextUnreadChapterNumber === null

				const overviewPath = generateNovelPath(novelData)
				const writerPath = generateWriterPath(novelData.writerSlug)

				return (
					<li key={novelData.titleSlug} className="group">
						<div
							className={clsx(
								'relative pl-5 mt-10',
								'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded before:transition-all before:duration-300',
								isFinished
									? 'before:bg-green-500 before:group-hover:bg-green-600'
									: hasProgress
										? 'before:bg-amber-500 before:group-hover:bg-amber-600'
										: 'before:bg-zinc-200 before:group-hover:bg-zinc-300',
							)}
						>
							<Link href={overviewPath} className="block text-xl text-zinc-800 font-medium link hover:opacity-90 active:opacity-80">
								{novelData.titleDisplay}
							</Link>
							<Link href={writerPath} className="block text-lg text-zinc-800 mb-4 link hover:opacity-90 active:opacity-80">
								{novelData.writerDisplay}
							</Link>
							<Link href={overviewPath} className="block link-primary mb-1">
								Overview
							</Link>
							<DynamicChapterLink
								hasProgress={hasProgress}
								nextChapterPath={nextChapterPath}
								isFinished={isFinished}
								nextUnreadChapterNumber={nextUnreadChapterNumber}
							/>
						</div>
					</li>
				)
			})}
		</ul>
	)
}
