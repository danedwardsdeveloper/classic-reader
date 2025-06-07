import { productionBaseURL } from '@/library/environment'
import logger from '@/library/logger'
import socialImage from '../../../../public/images/classicreader.png'

if (!socialImage) logger.error('social image missing')

const pathname = '/images/classicreader.png'

export const siteSocialImage = {
	src: socialImage,
	absolute: `${productionBaseURL}${pathname}`,
	relative: pathname,
}
