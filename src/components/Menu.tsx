import Link from 'next/link'

export default function Menu() {
	return (
		<nav className="w-full flex flex-col mb-16">
			<Link href="/" className="link text-xl">
				Classic Reader
			</Link>
		</nav>
	)
}
