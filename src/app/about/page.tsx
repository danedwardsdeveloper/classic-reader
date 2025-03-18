import BreadCrumbs from '@/components/BreadCrumbs'
import Footer from '@/components/Footer'
import { SecondaryNavigation } from '@/components/SecondaryNavigation'
import { metaTitleTemplate } from '@/library/environment'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `About ${metaTitleTemplate}`,
	alternates: {
		canonical: '/about',
	},
}

export default function AboutPage() {
	const bullets = [
		'Distraction-free reading',
		'Saves your progress without using cookies',
		'Add, request or edit the collection on GitHub',
		'Sustained solely by generous donations from readers like you',
	]

	return (
		<>
			<div className="flex-1 mb-20">
				<BreadCrumbs currentPageName="About" />
				<h1>About</h1>
				<ul className="flex flex-col gap-y-5 text-lg">
					{bullets.map((bullet) => (
						<li key={bullet} className="flex gap-x-2 items-start">
							<CheckCircleIcon className="size-6 text-emerald-500 shrink-0 mt-1" />
							{bullet}
						</li>
					))}
				</ul>
			</div>
			<SecondaryNavigation />
			<Footer />
		</>
	)
}
