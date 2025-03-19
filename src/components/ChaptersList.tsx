import { generateChapterPath } from '@/library/utilities/client'
import type { Novel } from '@/types'
import Link from 'next/link'

export default function ChaptersList({ novel }: { novel: Novel }) {
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
