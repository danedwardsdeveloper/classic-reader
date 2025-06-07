import { ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'

type Crumb = { display: string; href: string }

interface Props {
	currentPageName?: string | 'Not found'
	trail?: Crumb[]
	isHomePage?: boolean
	homeOnly?: boolean
}

export default function BreadCrumbs({ currentPageName, trail, isHomePage, homeOnly }: Props) {
	const homeDisplayText = 'ClassicReader.org'

	if (isHomePage) {
		return (
			<nav aria-label="Breadcrumb" className="mb-28 sm:mb-20">
				<span className="font-medium">{homeDisplayText}</span>
			</nav>
		)
	}

	const resolvedTrail = homeOnly ? [{ display: homeDisplayText, href: '/' }] : [{ display: homeDisplayText, href: '/' }, ...(trail || [])]

	const breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			...resolvedTrail.map((item, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: item.display,
				item: `https://classicreader.org${item.href}`,
			})),
			...(currentPageName
				? [
						{
							'@type': 'ListItem',
							position: resolvedTrail.length + 1,
							name: currentPageName,
						},
					]
				: []),
		],
	}

	return (
		<nav aria-label="Breadcrumb" className="mb-28 sm:mb-20">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <build-time only>
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>
			<ol className="flex flex-wrap w-full items-center gap-2 sm:gap-3">
				{resolvedTrail.map((item) => (
					<li key={item.href} className="flex items-center">
						<Link href={item.href} className="link-primary mr-2 sm:mr-3">
							{item.display}
						</Link>
						<ChevronRightIcon className="size-4 text-zinc-500" />
					</li>
				))}
				<li className={clsx('font-medium', currentPageName === 'Not found' && 'text-red-600')}>{currentPageName}</li>
			</ol>
		</nav>
	)
}
