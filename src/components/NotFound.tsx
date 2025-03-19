'use client'
import { usePathname } from 'next/navigation'

export default function NotFoundComponent() {
	const pathname = usePathname()
	return (
		<>
			<h2 className="text-red-600">Page not found</h2>
			<p className="mb-20 text-red-600">
				{`Sorry, we couldn't find the page `}
				{pathname}
			</p>
		</>
	)
}
