import type { Metadata, Viewport } from 'next'
import './styles.tailwind.css'
import { siteSocialImage } from '@/library/data/images'
import { serverSideBaseUrl } from '@/library/serverEnvironment'
import Script from 'next/script'
import type { ReactNode } from 'react'

const metaTitle = 'ClassicReader.org - Read classic novels online.'
const metaDescription = 'ClassicReader.org is a website for reading classic novels in the browser without any ads, distractions or clutter.'

export const metadata: Metadata = {
	title: metaTitle,
	metadataBase: new URL(serverSideBaseUrl),
	description: metaDescription,
	openGraph: {
		title: metaTitle,
		description: metaDescription,
		images: [siteSocialImage.relative],
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
				<div className="min-h-screen flex flex-col w-full max-w-prose mx-auto py-12 px-4 md:px-12 bg-white">{children}</div>
			</body>
			<Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
		</html>
	)
}
