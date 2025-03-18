'use client'
import { useLocalStorage } from '@/providers/localStorage'
import type { Novel } from '@/types'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'

export default function ChapterNavigation({ novelData, currentPage }: { novelData: Novel; currentPage: number }) {
	// const router = useRouter()
	const { markChapterAsRead } = useLocalStorage()

	const totalChapters = novelData.chapters.length
	const isFirstChapter = currentPage === 1
	const isLastChapter = currentPage === totalChapters
	const nextPage = currentPage + 1
	const previousPage = currentPage - 1

	const baseUrl = `/writers/${novelData.writerSlug}/novels/${novelData.titleSlug}`

	function handlePrevious() {
		if (isFirstChapter) return null
		// ToDo: fix this
		// router.push(generateChapterPath({ novelData: novelData, oneIndexedChapterNumber: previousPage }))
	}

	function handleNext() {
		if (isLastChapter) return null
		markChapterAsRead(novelData.titleSlug, currentPage - 1)
		// router.push(generateChapterPath({ novelData: novelData, oneIndexedChapterNumber: nextPage }))
	}

	return (
		<div className="mt-32 flex flex-col gap-y-6 sm:grid sm:grid-cols-3">
			<div className="col-span-1">
				{!isFirstChapter && (
					<button type="button" onClick={() => handlePrevious()} className="link-primary flex items-center gap-x-2 text-xl">
						<ArrowLongLeftIcon className="size-8" />
						Chapter {previousPage}
					</button>
				)}
			</div>
			<div className="col-span-1 text-center">
				<Link href={baseUrl} className="text-xl link-primary">
					Manage progress
				</Link>
			</div>
			<div className="col-span-1 flex justify-end">
				{!isLastChapter && (
					<button type="button" onClick={() => handleNext()} className="link-primary flex items-center gap-x-2 text-xl">
						<span className="font-medium">Chapter {nextPage}</span>
						<ArrowLongRightIcon className="size-8" />
					</button>
				)}
			</div>
		</div>
	)
}
