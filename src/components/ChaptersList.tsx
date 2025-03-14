'use client'
import { getSlugFromDisplay } from '@/library/getSlugFromDisplay'
import { useLocalStorage } from '@/providers/localStorage'
import type { Novel } from '@/types'
import Link from 'next/link'
import Spinner from './Spinner'

export default function ChaptersList({ novel }: { novel: Novel }) {
	const { isLoading, getBookChapters, toggleChapter } = useLocalStorage()
	const checkedChapters = getBookChapters(novel.slug)
	const writerSlug = getSlugFromDisplay(novel.writer)

	if (isLoading) return <Spinner />

	return (
		<ul className="flex flex-col gap-y-6">
			{novel.chapters.map((chapter, index) => (
				<li key={chapter[0]} className="flex gap-x-2 items-center">
					<input
						type="checkbox"
						checked={!!checkedChapters[index]}
						onChange={() => toggleChapter(novel.slug, index)}
						className="size-6 bg-gray-100 border-gray-300 rounded focus:ring-2 transition duration-300 text-blue-600 focus:ring-orange-400 hover:bg-blue-200"
						aria-label={`Mark Chapter ${index + 1} as read`}
					/>
					<Link href={`/writers/${writerSlug}/novels/${novel.slug}/${index + 1}`} className="link-primary text-lg">
						Chapter {index + 1}
					</Link>
				</li>
			))}
		</ul>
	)
}
