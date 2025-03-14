import type { Novel } from '@/types'
import Link from 'next/link'

export default function NovelHeader({ novel }: { novel: Novel }) {
	return (
		<div className="w-full flex flex-col gap-y-2 md:flex-row justify-between mt-10">
			<Link href={`/books/${novel.slug}`} className="text-lg link">
				{novel.title.toUpperCase()}
			</Link>
			<span className="text-lg text-zinc-600">{novel.writer.toUpperCase()}</span>
		</div>
	)
}
