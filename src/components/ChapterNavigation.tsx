'use client'
import { useLocalStorage } from '@/providers/localStorage'
import type { Book } from '@/types'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ChapterNavigation({ bookData, currentPage }: { bookData: Book; currentPage: number }) {
	const router = useRouter()
	const { markChapterAsRead } = useLocalStorage()
	const totalChapters = bookData.chapters.length
	const isFirstChapter = currentPage === 1
	const isLastChapter = currentPage === totalChapters
	const nextPage = currentPage + 1
	const previousPage = currentPage - 1

	function handlePrevious() {
		if (isFirstChapter) return null
		router.push(`/books/${bookData.slug}/${previousPage}`)
	}

	function handleNext() {
		if (isLastChapter) return null
		markChapterAsRead(bookData.slug, currentPage - 1)
		router.push(`/books/${bookData.slug}/${nextPage}`)
	}

	return (
		<div className="mt-12 grid grid-cols-3">
			<div className="col-span-1">
				{!isFirstChapter && (
					<button type="button" onClick={() => handlePrevious()} className="link flex items-center gap-x-2 text-xl">
						<ArrowLongLeftIcon className="size-8" />
						Chapter {previousPage}
					</button>
				)}
			</div>
			<div className="col-span-1 text-center">
				<Link href={`/books/${bookData.slug}`} className="text-xl link">
					Manage progress
				</Link>
			</div>
			<div className="col-span-1 flex justify-end">
				{!isLastChapter && (
					<button type="button" onClick={() => handleNext()} className="link flex items-center gap-x-2 text-xl">
						<span>Chapter {nextPage}</span>
						<ArrowLongRightIcon className="size-8" />
					</button>
				)}
			</div>
		</div>
	)
}
