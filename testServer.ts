import path from 'node:path'
import express, { type Request, type Response } from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const port = 3000

app.prepare().then(() => {
	const server = express()

	server.use('/_next', express.static(path.join(__dirname, '.next')))

	server.use('/_next/static/media', (req: Request, res: Response) => {
		handle(req, res)
	})

	server.all('*', (req: Request, res: Response) => {
		return handle(req, res)
	})

	server.listen(port, (err?: Error) => {
		if (err) throw err
		// biome-ignore lint/suspicious/noConsole:
		console.log(`> Ready on http://localhost:${port}`)
	})
})

process.on('uncaughtException', (err: Error) => {
	// biome-ignore lint/suspicious/noConsole:
	console.error('Uncaught Exception:', err)
	process.exit(1)
})

process.on('unhandledRejection', (reason: unknown) => {
	// biome-ignore lint/suspicious/noConsole:
	console.error('Unhandled Rejection:', reason)
	process.exit(1)
})
