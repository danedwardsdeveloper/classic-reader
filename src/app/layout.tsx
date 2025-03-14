import Providers from '@/components/Providers'
import { dynamicBaseURL } from '@/library/environment/publicVariables'
import type { Metadata, Viewport } from 'next'

import './styles.tailwind.css'
import Menu from '@/components/Menu'
import Script from 'next/script'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Home | ClassicReader.org - Read classic novels online.',
	metadataBase: new URL(dynamicBaseURL),
	description: 'ClassicReader.org is a website for reading classic novels in the browser without any ads, distractions or clutter.',
	alternates: {
		canonical: dynamicBaseURL,
	},
}

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang="en-GB" suppressHydrationWarning>
			<body className=" bg-slate-50">
				<Providers>
					<div className="min-h-screen flex flex-col w-full max-w-prose mx-auto py-12 px-4 md:px-12 bg-white">
						<Menu />
						{children}
					</div>
				</Providers>
			</body>
			<Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
		</html>
	)
}
