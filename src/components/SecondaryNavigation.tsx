import Link from 'next/link'

export function SecondaryNavigation() {
	const items: { display: string; href: string }[] = [
		{ display: 'Novels', href: '/novels' },
		{ display: 'Writers', href: '/writers' },
	]

	return (
		<nav className="mb-20">
			<ul className="flex gap-x-4">
				{items.map((item) => (
					<li key={item.href}>
						<Link href={item.href} className="link-primary text-xl">
							{item.display}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
