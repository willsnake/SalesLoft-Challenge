import React, { useState, useEffect } from 'react'
import { useSWRInfinite } from 'swr'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import { fetcher } from '../helpers/hooks'

// Interfaces
import { Person } from '../interfaces'

// Componentes
import Button from '../components/Button'
import UserCard from '../components/UserCard'

const PER_PAGE = 10
const PAGE_URL = process.env.NEXT_PUBLIC_SALESLOFT_API_URL

export default function Page({ Component, pageProps }: AppProps) {
  const [people, setPeople] = useState([])
  const [metadata, setMetadata] = useState({})
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `${PAGE_URL}?perPage=${PER_PAGE}&page=${index + 1}`,
    fetcher
  )

  const populatePeopleData = (people) => {
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
    <div className="container mx-auto">
      <div className="flex justify-around	items-center my-4">
        <Button display="Load People" onClick={() => setSize(1)} />
        <Button display="Load More People" onClick={() => setSize(size + 1)} />
      </div>
      <div className="flex flex-wrap flex-col justify-between">
        {people &&
          people.length &&
          people.map((person: Person) => {
            return (
              <div className="w-1/6 rounded bg-gray-400 mb-2">
                <UserCard
                  key={person.id}
                  email={person.email_address}
                  jobTitle={person.title}
                  name={`${person.first_name} ${person.last_name}`}
                />
              </div>
            )
          })}
      </div>
    </div>,
  ]
}
