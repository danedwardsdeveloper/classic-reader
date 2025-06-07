import { isProduction } from '@/library/environment'
import { notFound } from 'next/navigation'

export default function AuthorPoemsPage() {
	if (isProduction) return notFound()

	return (
		<>
			<h1>[Author]/poems/page.tsx</h1>
		</>
	)
}
