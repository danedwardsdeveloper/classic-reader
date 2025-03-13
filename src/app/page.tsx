import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
	return (
		<>
			<div className="flex-1 mb-32 md:mb-80 max-w-prose w-full mx-auto">
				<div className="flex flex-col w-full">
					<div className="flex flex-col gap-y-6">
						<Link href="/novels" className="text-xl link-primary">
							Novels
						</Link>
						<Link href="/poems" className="text-xl link-primary">
							Poems
						</Link>
						<Link href="/plays" className="text-xl link-primary">
							Plays
						</Link>
						<Link href="/writers" className="text-xl link-primary">
							Writers
						</Link>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
