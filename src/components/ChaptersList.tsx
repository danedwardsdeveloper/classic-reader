'use client'
import { useLocalStorage } from '@/providers/localStorage'
import type { Novel } from '@/types'
import Link from 'next/link'
import slugify from 'slugify'
import Spinner from './Spinner'

export default function ChaptersList({ novel }: { novel: Novel }) {
	const { isLoading, getBookChapters, toggleChapter } = useLocalStorage()
	const checkedChapters = getBookChapters(novel.titleSlug)

	// ToDo: Possibly replace this single spinner with many spinners in place of the checkboxes
	if (isLoading) return <Spinner />

	return (
		<ul className="flex flex-col gap-y-6">
			{novel.chapters.map((chapter, index) => {
				return (
					<li key={`${chapter.content[0]}-${index}`} className="flex gap-x-2 items-center">
						<input
							type="checkbox"
							checked={!!checkedChapters[index]}
							onChange={() => toggleChapter(novel.titleSlug, index)}
							className="size-6 bg-gray-100 border-gray-300 rounded focus:ring-2 transition duration-300 text-blue-600 focus:ring-orange-400 hover:bg-blue-200 shrink-0"
							aria-label={`Mark Chapter ${index + 1} as read`}
						/>
						<Link
							href={`/writers/${novel.writerSlug}/novels/${novel.titleSlug}/chapter-${index + 1}${chapter.title ? `-${slugify(chapter.title, { lower: true, strict: true })}` : ''}`}
							className="group flex items-center w-full"
						>
							<span className="text-lg whitespace-nowrap link-primary group-hover:text-blue-500 group-active:text-blue-600">
								Chapter {index + 1}
							</span>
							<span className="ml-4 text-zinc-500 truncate mr-8">{chapter.title || chapter.content[0]}</span>
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
