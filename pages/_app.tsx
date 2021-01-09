import useSWR from 'swr'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { fetcher } from '../helpers/hooks'

export default function Page({ Component, pageProps }: AppProps) {
  const { data, error } = useSWR('http://localhost:3000/api/hello', fetcher)

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'

  return <Component {...pageProps} />
}
