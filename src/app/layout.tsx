import Providers from '@/components/Providers'
import { dynamicBaseURL } from '@/library/environment/publicVariables'
import type { Metadata, Viewport } from 'next'

import './styles.tailwind.css'
import Footer from '@/components/Footer'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: `Dan's Next.js Configuration`,
	metadataBase: new URL(dynamicBaseURL),
	description: 'Site description',
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
					<div className="min-h-screen flex flex-col w-full max-w-4xl mx-auto py-12 px-4 md:px-12 bg-white">
						<div className="flex-1 mb-32 md:mb-80 max-w-prose w-full mx-auto">{children}</div>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	)
}
