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
const BASE_PAGING = {
  paging: {
    current_page: 0,
    next_page: null,
    per_page: PER_PAGE,
    prev_page: null,
    total_count: 0,
    total_pages: 0,
  },
}

export default function Page({ Component, pageProps }: AppProps) {
  const [people, setPeople] = useState([])
  const [metadata, setMetadata] = useState(BASE_PAGING)
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

  const loadMorePeopleDisabled =
    metadata.paging.current_page < metadata.paging.total_pages

  return [
    <Component {...pageProps} />,
    <div className="container mx-auto">
      <div className="flex justify-around items-center fixed top-0 bg-white container h-20">
        <Button display="Load People" onClick={() => setSize(1)} />
        <Button
          display="Load More People"
          onClick={() => setSize(size + 1)}
          disabled={!loadMorePeopleDisabled}
        />
        <Button
          display="Clear People"
          onClick={() => {
            setSize(0)
            setPeople([])
            setMetadata(BASE_PAGING)
          }}
        />
      </div>

      <div className="flex flex-wrap flex-col justify-between mt-24 mb-14">
        {people &&
          people.length &&
          people.map((person: Person) => {
            return (
              <div className="flex w-full justify-between h-36 mb-2">
                <div className="w-1/3 rounded bg-gray-400">
                  <UserCard
                    key={person.id}
                    email={person.email_address}
                    jobTitle={person.title}
                    name={`${person.first_name} ${person.last_name}`}
                  />
                </div>
                <div className="w-1/2 rounded overflow-auto border-2 border-gray-400">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Character
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Count
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })}
      </div>

      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 fixed bottom-0 container mx-auto">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium mx-2">
                {metadata.paging.current_page * metadata.paging.per_page}
              </span>
              of
              <span className="font-medium mx-2">
                {metadata.paging.total_count}
              </span>
              results
            </p>
          </div>
        </div>
      </div>
    </div>,
  ]
}
