import BreadCrumbs from '@/components/BreadCrumbs'
import Footer from '@/components/Footer'
import { metaTitleTemplate } from '@/library/environment'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: `Privacy policy ${metaTitleTemplate}`,
	alternates: {
		canonical: '/about',
	},
}

export default function PrivacyPolicyPage() {
	return (
		<>
			<BreadCrumbs homeOnly currentPageName="Privacy policy" />
			<div className="[&>p]:text-zinc-800 [&>p]:leading-9 [&>p]:text-lg">
				<h1>Privacy policy</h1>
				<h3>Our approach to privacy</h3>
				<p className="mb-4">
					In a digital world where privacy invasion has sadly become the norm, ClassicReader.org takes a different approach.
				</p>
				<p className="mb-16">
					You should be able to enjoy classic literature without being tracked, profiled, or having your data sold to advertisers.
				</p>

				<h3>Cookies</h3>
				<p className="mb-4">
					{`ClassicReader.org doesn't use any cookies whatsoever. There are no tracking, advertising, or "necessary" cookies.`}
				</p>
				<p className="mb-16">{`We don't have a cookie consent banner because we don't use cookies.`}</p>

				<h3>Local storage</h3>
				<p className="mb-4">{`We use your browser's local storage functionality to save your reading progress.`}</p>
				<p className="mb-4">
					{`For example, if you're halfway through `}
					<Link href="/writers/lucy-maud-montgomery/novels/anne-of-green-gables" className="italic link-primary">
						Anne of Green Gables
					</Link>{' '}
					and close your browser, this local storage means the browser remembers your place in the novel.
				</p>
				<p className="mb-4">
					This data (stored with keys like{' '}
					<span className="font-mono bg-zinc-100 rounded-lg border border-zinc-200 px-2 py-1">book_chapters_anne-of-green-gables</span>
					{`)
					never leaves your device. It's stored locally on your computer or phone, not on our servers.`}
				</p>
				<p className="mb-16">You can clear this data anytime through your browser settings, which will reset your reading progress. </p>

				<h3>Analytics</h3>
				<p className="mb-4">
					We use{' '}
					<Link href="https://www.simpleanalytics.com/" className="link-primary" target="_blank" rel="noopener noreferrer">
						Simple Analytics
					</Link>
					{`, a privacy-focused analytics service that doesn't track individuals.`}
				</p>
				<p className="mb-4">We can see general, anonymous information like:</p>
				<ul className="list-disc list-inside text-lg text-zinc-800 [&>li]:mb-2 mb-8 marker:text-zinc-500">
					<li>How many people visited the site</li>
					<li>Which pages are most popular</li>
					<li>What countries visitors come from</li>
					<li>Which devices and browsers visitors are using</li>
				</ul>
				<p className="mb-4">
					{`But importantly, SimpleAnalytics doesn't use cookies, doesn't collect personal data, and doesn't build profiles of individual
					users.`}
				</p>
				<p className="mb-16">{`We can't identify you or track you across websites.`}</p>

				<h3>{`What we don't do`}</h3>
				<ul className="list-disc list-inside text-lg text-zinc-800 [&>li]:mb-2 mb-16 marker:text-zinc-500">
					<li>{`We don't sell data`}</li>
					<li>{`We don't track you across different websites`}</li>
					<li>{`We don't share
					information with advertising networks`}</li>
					<li>{`We don't require you to create an account`}</li>
					<li>{`We don't store your reading progress on our
					servers`}</li>
				</ul>

				<h3>Why we made these choices</h3>
				<p className="mb-4">
					We built ClassicReader.org because we love classic literature and want everyone to have simple, straightforward access to these
					incredible creative works.
				</p>
				<p className="mb-16">{`The internet doesn't need to be a dystopia of constant surveillance.
`}</p>

				<h3>Changes to this policy</h3>
				<p className="mb-4">{`If we make any changes to this privacy policy, we'll update it here.`}</p>
				<p className="mb-20">{`But don't worry - our commitment to privacy won't change.`}</p>
				<p className="italic font-zinc-600">Updated Tuesday, March 18, 2025</p>
			</div>
			<Footer />
		</>
	)
}
