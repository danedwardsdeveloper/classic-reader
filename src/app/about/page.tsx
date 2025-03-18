import BreadCrumbs from '@/components/BreadCrumbs'
import Footer from '@/components/Footer'
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
				<p className="mb-4 text-zinc-800 text-lg">
					ClassicReader.org is a website that allows you to read classic novels in the browser without any distractions.
				</p>
				<p className="mb-4 text-zinc-800 text-lg">{`It's completely free and sustained solely by generous donations from readers like you.`}</p>
				<ul className="flex flex-col gap-y-5 text-lg text-zinc-800">
					{bullets.map((bullet) => (
						<li key={bullet} className="flex gap-x-2 items-start">
							<CheckCircleIcon className="size-6 text-emerald-600 shrink-0 mt-1" />
							{bullet}
						</li>
					))}
				</ul>
			</div>
			<Footer />
		</>
	)
}
