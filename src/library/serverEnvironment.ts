import { developmentBaseURL, isProduction, productionBaseURL } from './environment'

export const serverSideBaseUrl = isProduction
	? process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: productionBaseURL
	: developmentBaseURL
