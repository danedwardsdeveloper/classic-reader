import BooksList from '@/components/BooksList'
import Footer from '@/components/Footer'
import Menu from '@/components/Menu'

export default function Home() {
	return (
		<>
			<div className="flex-1 mb-32 md:mb-80 max-w-prose w-full mx-auto">
				<div className="flex flex-col w-full">
					<Menu />
					<BooksList />
				</div>
			</div>
			<Footer />
		</>
	)
}
