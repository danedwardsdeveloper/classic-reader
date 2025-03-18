import BreadCrumbs from '@/components/BreadCrumbs'
import Footer from '@/components/Footer'
import { metaTitleTemplate } from '@/library/environment'
import type { Metadata } from 'next'

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
			<div className="flex-1">
				<h1>Privacy Policy</h1>
				<p>ToDo...</p>
			</div>
			<Footer />
		</>
	)
}
