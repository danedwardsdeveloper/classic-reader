import logger from '@/library/logger'

export type MetadataType = 'title' | 'description'

export function optimiseMetadata({
	base,
	extraPhrases,
	type,
	separator = ' ',
}: {
	base: string
	extraPhrases: string[]
	type: MetadataType
	separator?: ' ' | ' | ' | ' - ' | '. '
}): string {
	const metadataConstraints = {
		title: {
			minimum: 50,
			maximum: 65,
		},
		description: {
			minimum: 70,
			maximum: 155,
		},
	}

	const { minimum, maximum } = metadataConstraints[type]

	let result = base

	if (result.length > maximum) {
		logger.warn(`Metadata is too long. Maximum: ${maximum}. Actual: ${result.length}: ${result}`)
	}

	const bestPhrase = extraPhrases.reduce((best, phrase) => {
		const newLength = result.length + separator.length + phrase.length
		if (newLength <= maximum && phrase.length > best.length) return phrase
		return best
	}, '')

	if (bestPhrase) result += separator + bestPhrase

	if (result.length < minimum) {
		logger.warn(`Meta${type} is too short. Minimum: ${minimum}. Actual: ${result.length}. ${result}`)
	}

	return result
}
