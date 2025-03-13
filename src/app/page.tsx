import Footer from '@/components/Footer'
import Menu from '@/components/Menu'
import Link from 'next/link'

export default function Home() {
	return (
		<>
			<div className="flex-1 mb-32 md:mb-80 max-w-prose w-full mx-auto">
				<div className="flex flex-col w-full">
					<Menu />
					<Link href="/novels">Novels</Link>
					<Link href="/poems">Poems</Link>
				</div>
			</div>
			<Footer />
		</>
	)
}
