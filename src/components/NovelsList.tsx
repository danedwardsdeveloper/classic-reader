import { generateChapterPath, generateNovelPath, generateWriterPath } from '@/library/utilities/client/definitions/generatePaths'
import type { Novel } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'

export default function NovelsList({ novels }: { novels: Novel[] }) {
	return (
		<ul className="flex flex-col gap-y-14 divide-y-2 divide-zinc-100">
			{novels.map((novelData) => {
				if (!novelData) return null

				const overviewPath = generateNovelPath(novelData)
				const writerPath = generateWriterPath(novelData.writerSlug)
				const chapterPath = generateChapterPath({
					novelData: novelData,
					oneIndexedChapterNumber: 1,
				})

				const chapterTitle = novelData.chapters[0].title
				const chapterOneLinkText = chapterTitle ? `Chapter 1 - ${chapterTitle}` : 'Chapter 1'

				return (
					<li key={novelData.titleSlug} className="group">
						<div
							className={clsx(
								'relative pl-5 mt-10',
								'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded before:transition-all before:duration-300',
								'before:bg-zinc-200 before:group-hover:bg-zinc-300',
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
							<Link href={chapterPath} className="link-primary">
								{chapterOneLinkText}
							</Link>
						</div>
					</li>
				)
			})}
		</ul>
	)
}
