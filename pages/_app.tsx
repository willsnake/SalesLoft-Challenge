import React, { useState, useEffect } from 'react'
import { useSWRInfinite } from 'swr'
import type { AppProps } from 'next/app'

import '../styles/globals.css'

// Helpers
import { fetcher } from '../helpers/hooks'

// Libraries
import { frequencyCount, fuzzySearch } from '../lib'

// Interfaces
import { PersonWithFrequency } from '../interfaces'

// Componentes
import Button from '../components/Button'
import UserCard from '../components/UserCard'
import TableCount from '../components/TableCount'
import Loader from '../components/Loader'
import ModalPossibleDuplicates from '../components/ModalPossibleDuplicates'

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
  const [showTableCount, setShowTableCount] = useState(false)
  const [showPossibleDuplicates, setShowPossibleDuplicates] = useState(false)
  const [possibleDuplicates, setPossibleDuplicates] = useState([])

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${PAGE_URL}?perPage=${PER_PAGE}&page=${index + 1}`,
    fetcher
  )

  const populatePeopleData = (newPeopleToPopulateLocaly) => {
    let newPeople = []
    const peopleWithFrequency = frequencyCount(newPeopleToPopulateLocaly)
    newPeople = people.concat(...peopleWithFrequency)
    return newPeople
  }

  const searchPosibleDuplicates = (arrayOfEmails: string[]): string[] => {
    let setPosibleDuplicates: string[] = []

    for (let email of arrayOfEmails) {
      const duplicatesFound: string[] = fuzzySearch(email, arrayOfEmails)
      if (duplicatesFound.length > 1) {
        setPosibleDuplicates = setPosibleDuplicates.concat(...duplicatesFound)
      }
    }

    return [...new Set(setPosibleDuplicates)]
  }

  useEffect(() => {
    if (data && data[size - 1]) {
      const newPeopleToPopulate = data[size - 1]
      setPeople(populatePeopleData(newPeopleToPopulate.data))
      setMetadata(newPeopleToPopulate.metadata)
    }
  }, [data])

  useEffect(() => {
    const emailsMap: string[] = people.map((person: PersonWithFrequency) => {
      return person.email_address
    })
    // We remove duplicates from the emailsMap
    setPossibleDuplicates(searchPosibleDuplicates([...new Set(emailsMap)]))
  }, [people])

  // If there are no more pages on the API to display, disable the "Load More People" button
  const loadMorePeopleDisabled =
    metadata.paging.current_page < metadata.paging.total_pages

  // Check if the app is loading
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')

  if (error) {
    return (
      <div>OH NO! Something happened, don't worry we're working to fix it</div>
    )
  }

  return [
    <Component {...pageProps} />,

    showPossibleDuplicates && (
      <ModalPossibleDuplicates
        emails={possibleDuplicates}
        onCloseButton={() => setShowPossibleDuplicates(!showPossibleDuplicates)}
        onCloseSvg={() => setShowPossibleDuplicates(!showPossibleDuplicates)}
      />
    ),

    <Loader show={isLoadingInitialData || isLoadingMore} />,

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
        <Button
          display={!showTableCount ? 'Show Table Count' : 'Hide Table Count'}
          onClick={() => setShowTableCount(!showTableCount)}
        />
        <Button
          display={'Show Possible Duplicates'}
          onClick={() => setShowPossibleDuplicates(!showPossibleDuplicates)}
        />
      </div>

      <div className="flex flex-wrap flex-col justify-between mt-24 mb-14">
        {people &&
          people.length &&
          people.map((person: PersonWithFrequency) => {
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
                {showTableCount && (
                  <div className="w-1/2 rounded overflow-auto border-2 border-gray-400">
                    <TableCount rows={person.frequency} />
                  </div>
                )}
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
