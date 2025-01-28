export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const API_VERSION = "v1"

export const getApiUrl = (path: string) => `${API_BASE_URL}/${API_VERSION}${path}`

