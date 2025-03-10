import Link from 'next/link'

export default function Menu({ bookName, author }: { bookName?: string; author?: string }) {
	return (
		<nav className="w-full">
			<ul className="w-full grid grid-cols-2 md:grid-cols-3 mb-12">
				<li className="col-span-2 md:col-span-1 mb-8 md:mb-0">
					<Link href="/" className="link text-xl">
						Classic Reader
					</Link>
				</li>
				{bookName && <li className="col-span-1 flex md:justify-center">{bookName}</li>}
				{author && <li className="col-span-1 flex justify-end">{author}</li>}
			</ul>
		</nav>
	)
}
