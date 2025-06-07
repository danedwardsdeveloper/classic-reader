import { isProduction } from '@/library/environment'
import { notFound } from 'next/navigation'

export default function AuthorPlaysPage() {
	if (isProduction) return notFound()
	return (
		<>
			<h1>[Author]/plays/page.tsx</h1>
		</>
	)
}
