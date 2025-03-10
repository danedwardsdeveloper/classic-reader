import Link from 'next/link'

export default function Footer() {
	// ToDo: set up Ko-Fi and add links
	return (
		<ul className="flex flex-col md:flex-row w-full items-end gap-y-3 md:justify-between">
			<li>
				<Link href="/" className="link">
					Make a donation
				</Link>
			</li>
			<li>
				<Link href="/" className="link">
					Add a book
				</Link>
			</li>
			<li>
				<Link href="/about" className="link">
					About
				</Link>
			</li>
			<li>
				<Link href="/cookie-policy" className="link">
					Cookie policy
				</Link>
			</li>
			<li>
				Site by{' '}
				<Link href="https://danedwardsdeveloper.com/" className="link">
					Dan Edwards
				</Link>
			</li>
		</ul>
	)
}
