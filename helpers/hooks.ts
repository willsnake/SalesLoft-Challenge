/**
 * Fetcher function to get data from the url passed as parameter.
 * @param {string} url - The url we want to get data from.
 */
export const fetcher = (url) => fetch(url).then((res) => res.json())
