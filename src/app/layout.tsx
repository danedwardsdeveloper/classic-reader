import Providers from '@/components/Providers'
import { dynamicBaseURL } from '@/library/environment/publicVariables'
import type { Metadata, Viewport } from 'next'

import './styles.tailwind.css'
import logger from '@/library/logger'
import Script from 'next/script'
import type { ReactNode } from 'react'
import socialImage from '../../public/images/classicreader.png'

if (!socialImage) {
	logger.error('@/app/layout.tsx: social image missing')
}

const metaTitle = 'ClassicReader.org - Read classic novels online.'
const metaDescription = 'ClassicReader.org is a website for reading classic novels in the browser without any ads, distractions or clutter.'

export const metadata: Metadata = {
	title: metaTitle,
	metadataBase: new URL(dynamicBaseURL),
	description: metaDescription,
	openGraph: {
		title: metaTitle,
		description: metaDescription,
		images: ['images/classicreader.png'],
	},
	alternates: {
		canonical: '/',
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
					<div className="min-h-screen flex flex-col w-full max-w-prose mx-auto py-12 px-4 md:px-12 bg-white">{children}</div>
				</Providers>
			</body>
			<Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
		</html>
	)
}
