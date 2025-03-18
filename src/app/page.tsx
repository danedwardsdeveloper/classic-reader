import BreadCrumbs from '@/components/BreadCrumbs'
import Footer from '@/components/Footer'
import NovelsList from '@/components/NovelsList'
import { getAllNovels } from '@/library/utilities/server'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

function TempBooks() {
	const BOOKS = [
		{ title: 'Anne of Green Gables', author: 'Lucy Maud Montgomery', progress: 'Continue at chapter 3' },
		{ title: 'Cranford', author: 'Elizabeth Gaskell', progress: 'Continue at chapter 2' },
		{ title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', progress: 'Read...' },
		{ title: 'Dracula', author: 'Bram Stoker', progress: 'Read...' },
		{ title: 'Emma', author: 'Jane Austen', progress: 'Read...' },
		{ title: 'Jane Eyre', author: 'Charlotte Brontë', progress: 'Read...' },
		{ title: 'Little Women', author: 'Louisa May Alcott', progress: 'Read...' },
		{ title: 'Madame Bovary', author: 'Gustave Flaubert', progress: 'Read...' },
		{ title: 'Northanger Abbey', author: 'Jane Austen', progress: 'Read...' },
		{ title: 'Pride and Prejudice', author: 'Jane Austen', progress: 'Finished' },
		{ title: 'Sense and Sensibility', author: 'Jane Austen', progress: 'Read...' },
		{ title: "Tess of the d'Urbervilles", author: 'Thomas Hardy', progress: 'Read...' },
		{ title: 'The Tenant of Wildfell Hall', author: 'Anne Brontë', progress: 'Read...' },
		{ title: 'Treasure Island', author: 'Robert Louis Stevenson', progress: 'Read...' },
		{ title: 'War and Peace', author: 'Leo Tolstoy', progress: 'Continue at chapter 2' },
	]

	return (
		<div className="space-y-1">
			{BOOKS.map((book) => (
				<div key={book.title} className="flex items-center p-2 group hover:bg-amber-50 rounded transition-colors duration-300">
					<div
						className={`w-1 h-16 mr-3 rounded transition-all duration-300 ${
							book.progress === 'Finished'
								? 'bg-green-500 group-hover:bg-green-600'
								: book.progress.includes('Continue')
									? 'bg-amber-500 group-hover:bg-amber-600'
									: 'bg-gray-200 group-hover:bg-gray-300'
						} group-hover:h-20`}
					/>
					<div className="flex-1 duration-300">
						<div className="flex justify-between">
							<h3 className="font-medium transition-colors duration-300 group-hover:text-amber-800">{book.title}</h3>
							{book.progress === 'Finished' && (
								<CheckCircleIcon className="h-4 w-4 text-green-500 transition-colors duration-300 group-hover:text-green-600" />
							)}
						</div>
						<p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">{book.author}</p>
						<div className="mt-1 flex justify-between text-xs">
							<span className="text-gray-500 transition-colors duration-300 group-hover:text-gray-700">{book.progress}</span>
							<button type="button" className="text-gray-500 transition-colors duration-300 group-hover:text-amber-700">
								Manage
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default async function Home() {
	const novels = await getAllNovels()
	return (
		<>
			<BreadCrumbs isHomePage />
			<div className="flex-1 max-w-prose w-full mx-auto">
				<div className="flex flex-col w-full">
					<div className="flex flex-col gap-y-6">
						<div className="text-lg mb-20">
							<p className="mb-4">
								ClassicReader.org is a website that allows you to read classic novels in the browser without any distractions.
							</p>
							<p>
								{`It's completely free and sustained solely by generous donations from readers like you. `}
								<Link href="/about" className="link-primary">
									Find out more.
								</Link>
							</p>
						</div>
						<h2>Novels</h2>
						<NovelsList novels={novels} />
						<TempBooks />
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
