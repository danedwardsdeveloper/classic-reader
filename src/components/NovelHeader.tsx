import type { Book } from '@/types'
import Link from 'next/link'

export default function NovelHeader({ book }: { book: Book }) {
	return (
		<div className="w-full flex flex-col gap-y-2 md:flex-row justify-between mt-10">
			<Link href={`/books/${book.slug}`} className="text-lg link">
				{book.title.toUpperCase()}
			</Link>
			<span className="text-lg text-zinc-600">{book.writer.toUpperCase()}</span>
		</div>
	)
}
