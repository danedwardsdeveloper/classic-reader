export function hasProgress(chaptersProgressData: Record<number, boolean>) {
	if (chaptersProgressData == null) {
		return false
	}

	for (const key in chaptersProgressData) {
		if (chaptersProgressData[key] === true) {
			return true
		}
	}

	return false
}
