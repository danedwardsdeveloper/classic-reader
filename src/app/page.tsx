import BooksList from '@/components/BooksList'
import Menu from '@/components/Menu'

export default function Home() {
	return (
		<div className="flex flex-col w-full">
			<Menu />
			<BooksList />
		</div>
	)
}
