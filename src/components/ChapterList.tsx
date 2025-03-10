'use client'

import type { Book } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ChapterList({ book }: { book: Book }) {
	const [checkedChapters, setCheckedChapters] = useState<Record<number, boolean>>({})

	useEffect(() => {
		const storedCheckedChapters = localStorage.getItem(`book-${book.slug}-chapters`)
		if (storedCheckedChapters) {
			setCheckedChapters(JSON.parse(storedCheckedChapters))
		}
	}, [book.slug])

	useEffect(() => {
		if (Object.keys(checkedChapters).length > 0) {
			localStorage.setItem(`book-${book.slug}-chapters`, JSON.stringify(checkedChapters))
		}
	}, [checkedChapters, book.slug])

	const handleCheckboxChange = (chapterIndex: number) => {
		setCheckedChapters((prev) => ({
			...prev,
			[chapterIndex]: !prev[chapterIndex],
		}))
	}

	return (
		<ul className="flex flex-col gap-y-6">
			{book.chapters.map((chapter, index) => (
				<li key={chapter[0]} className="flex gap-x-2 items-center">
					<input
						type="checkbox"
						checked={!!checkedChapters[index]}
						onChange={() => handleCheckboxChange(index)}
						className="size-6 bg-gray-100 border-gray-300 rounded focus:ring-2 transition duration-300 text-blue-600 focus:ring-orange-400 hover:bg-blue-200"
						aria-label={`Mark Chapter ${index + 1} as read`}
					/>
					<Link href={`/books/${book.slug}/${index + 1}`} className="link text-lg">
						Chapter {index + 1}
					</Link>
				</li>
			))}
		</ul>
	)
}
