import { initialiseStringOptimiser, metaDescriptionConfig, metaTitleConfig } from 'string-optimiser'

export const optimiseDescription = initialiseStringOptimiser({
	minimumLength: metaDescriptionConfig.minimumLength,
	maximumLength: metaDescriptionConfig.maximumLength,
	separator: ' ',
})

export const optimiseTitle = initialiseStringOptimiser({
	minimumLength: metaTitleConfig.minimumLength,
	maximumLength: metaTitleConfig.maximumLength,
	separator: ', ',
})
