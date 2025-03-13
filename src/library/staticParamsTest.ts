import { getAllBooks, getBookBySlug } from './books'
import { authors } from './constants'
import logger from './logger'

type UnwrappedParams = { writer: string; novel: string }
type Params = Promise<UnwrappedParams>

export async function generateStaticParams() {
	const books = await getAllBooks()
	logger.info(`Got ${books.length} books`)

	const paramsWithNulls = await Promise.all(
		books.map(async (book, index) => {
			logger.info(`Processing book ${index}: ${book.slug}`)

			const fullBookDetails = await getBookBySlug(book.slug)
			if (!fullBookDetails) {
				logger.warn(`No details for book ${book.slug}`)
				return null
			}

			const authorEntry = Object.values(authors).find((a) => a.display === book.author)
			if (!authorEntry) return null
			return {
				writer: authorEntry.slug,
				novel: fullBookDetails.slug,
			}
		}),
	)
	return paramsWithNulls.filter(Boolean) as UnwrappedParams[]
}

// logger.info('Static params: ', generateStaticParams())

const janeEyre = getBookBySlug('jane-eyre')
logger.info('Get book by slug: ', janeEyre)

/* 
pnpm tsx src/library/staticParamsTest.ts
*/
