'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Menu() {
	const pathname = usePathname()

	return (
		<nav className="w-full flex flex-col mb-16">
			<Link href="/" className={clsx('link text-xl', pathname === '/' && 'font-medium')}>
				ClassicReader.org
			</Link>
		</nav>
	)
}
