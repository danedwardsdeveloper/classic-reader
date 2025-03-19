'use client'
import { generateChapterPath } from '@/library/utilities/client'
import { useLocalStorage } from '@/providers/localStorage'
import type { Novel } from '@/types'
import Link from 'next/link'
import Spinner from './Spinner'

export default function ChaptersList({ novel }: { novel: Novel }) {
	const { isLoading, getBookChapters, toggleChapter } = useLocalStorage()
	const checkedChapters = getBookChapters(novel.titleSlug)

	function Checkbox({ zeroIndex }: { zeroIndex: number }) {
		return (
			<input
				type="checkbox"
				checked={!!checkedChapters[zeroIndex]}
				onChange={() => toggleChapter(novel.titleSlug, zeroIndex)}
				className="size-6 bg-gray-100 border-gray-300 rounded focus:ring-2 transition duration-300 text-blue-600 focus:ring-orange-400 hover:bg-blue-200 shrink-0"
				aria-label={`Mark Chapter ${zeroIndex + 1} as read`}
			/>
		)
	}

	return (
		<ul className="flex flex-col gap-y-6">
			{novel.chapters.map((chapter, index) => {
				const chapterPath = generateChapterPath({
					novelData: novel,
					oneIndexedChapterNumber: index + 1,
				})

				return (
					<li
						key={`${chapter.content[0]}-${index}`} // handle novels with duplicate chapter names, such as Clarissa & Dracula
						className="flex gap-x-2 items-center"
					>
						<div className="h-8 w-10 flex items-center shrink-0">
							{isLoading ? <Spinner classes="size-4" colour="text-zinc-300" /> : <Checkbox zeroIndex={index} />}
						</div>
						<Link href={chapterPath} className="group flex items-center w-full">
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
