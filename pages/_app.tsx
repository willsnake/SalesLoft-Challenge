import React, { useState, useEffect } from 'react'
import { useSWRInfinite } from 'swr'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import { fetcher } from '../helpers/hooks'
import { Person } from '../interfaces'

const PER_PAGE = 10
const PAGE_URL = process.env.NEXT_PUBLIC_SALESLOFT_API_URL

export default function Page({ Component, pageProps }: AppProps) {
  const [people, setPeople] = useState([])
  const [metadata, setMetadata] = useState({})
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `${PAGE_URL}?perPage=${PER_PAGE}&page=${index + 1}`,
    fetcher
  )

  const populatePeopleData = people => {
    let newPeople = []
    for (let { data } of people) {
      newPeople = newPeople.concat(...data)
    }
    return newPeople
  }

  useEffect(() => {
    if (data && data[size - 1]) {
      setPeople(populatePeopleData(data))
      setMetadata(data[size - 1].metadata)
    }
  }, [data])

  return [
    <Component {...pageProps} />,
    <div>
      <button
        onClick={() => {
          setSize(1)
        }}
      >
        Load People
      </button>
      <p>
        <button onClick={() => setSize(size + 1)}>Load more</button>
        <button disabled={!size} onClick={() => setSize(0)}>
          clear
        </button>
      </p>
      <button onClick={() => mutate()}>refresh</button>
      {people.map((person: Person) => {
        return <div key={person.id}>
          <p>- Name: {person.first_name} {person.last_name}</p>
          <p>- Email: {person.email_address}</p>
          <p>- Job Title: {person.title}</p>
        </div>
      })}
    </div>,
  ]
}
