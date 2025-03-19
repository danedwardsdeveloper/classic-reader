'use client'
import { generateChapterPath } from '@/library/utilities/client'
import { useLocalStorage } from '@/providers/localStorage'
import type { Novel } from '@/types'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ChapterNavigation({ novelData, currentPage }: { novelData: Novel; currentPage: number }) {
	const { markChapterAsRead } = useLocalStorage()

	const totalChapters = novelData.chapters.length
	const isFirstChapter = currentPage === 1
	const isLastChapter = currentPage === totalChapters
	const nextPage = currentPage + 1
	const previousPage = currentPage - 1

	const baseUrl = `/writers/${novelData.writerSlug}/novels/${novelData.titleSlug}`

	const previousChapterPath = generateChapterPath({
		novelData: novelData,
		oneIndexedChapterNumber: previousPage,
	})

	const nextChapterPath = generateChapterPath({
		novelData: novelData,
		oneIndexedChapterNumber: nextPage,
	})

	function handleMarkAsRead() {
		markChapterAsRead(novelData.titleSlug, currentPage - 1)
	}

	return (
		<div className="mt-32 flex flex-col gap-y-6 sm:grid sm:grid-cols-3">
			<div className="col-span-1">
				{!isFirstChapter && (
					<Link href={previousChapterPath} className="link-primary flex items-center gap-x-2 text-xl">
						<ArrowLongLeftIcon className="size-8" />
						Chapter {previousPage}
					</Link>
				)}
			</div>
			<div className="col-span-1 text-center">
				<Link href={baseUrl} className="text-xl link-primary">
					Manage progress
				</Link>
			</div>
			<div className="col-span-1 flex justify-end">
				{!isLastChapter && (
					<Link href={nextChapterPath} onClick={handleMarkAsRead} className="link-primary flex items-center gap-x-2 text-xl">
						<span className="font-medium">Chapter {nextPage}</span>
						<ArrowLongRightIcon className="size-8" />
					</Link>
				)}
			</div>
		</div>
	)
}
