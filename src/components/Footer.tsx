import type { Novel } from '@/types'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Footer({ currentNovel }: { currentNovel?: Novel }) {
	// ToDo: set up Ko-Fi and add links
	return (
		<footer className="mt-32">
			<nav className="flex flex-col md:flex-row">
				<ul className=" flex flex-col w-full gap-y-3 mb-3 md:mb-0 justify-end ">
					<li>
						<Link href="/about" className="link-primary">
							About
						</Link>
					</li>
					<li>
						<Link href="/privacy-policy" className="link-primary">
							Privacy policy
						</Link>
					</li>
				</ul>
				<ul className=" flex flex-col w-full gap-y-3 justify-end md:items-end text-right">
					<li>
						<Link href="/" className="link-primary flex gap-x-1 items-center">
							Make a donation
							<ArrowUpRightIcon className="size-4" />
						</Link>
					</li>
					<li className="flex gap-x-1">
						<span>Site by </span>
						<Link href="https://danedwardsdeveloper.com/" className="flex gap-x-1 items-center link-primary">
							Dan Edwards
							<ArrowUpRightIcon className="size-4" />
						</Link>
					</li>
					{currentNovel && (
						<li>
							<Link
								href={`https://github.com/danedwardsdeveloper/classic-reader/blob/main/src/library/data/novels/${currentNovel.slug}.ts`}
								target="_blank"
								rel="noopener noreferrer"
								className="link-primary flex gap-x-1 items-center text-balance"
							>
								{`Edit ${currentNovel.title} on GitHub`}
								<ArrowUpRightIcon className="size-4" />
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</footer>
	)
}
