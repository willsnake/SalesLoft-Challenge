import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

// Interfaces
import { GetPeopleOptions, ApiResponse } from '../interfaces'

export default class Api {
  apiKey: string
  apiBaseUrl: string

  constructor({ apiKey, apiBaseUrl }: { apiKey: string; apiBaseUrl: string }) {
    this.apiKey = apiKey
    this.apiBaseUrl = apiBaseUrl
  }

  private async request(endpoint: string = '', options: any = {}) {
    const headers = new Headers()

    let url = this.apiBaseUrl + endpoint

    headers.append('Authorization', `Bearer ${this.apiKey}`)

    let config = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(url, config)
      const parsedAnswer = await response.json()
      if (parsedAnswer.error) {
        throw new Error(parsedAnswer.error)
      }
      return parsedAnswer
    } catch (err) {
      throw new Error(err)
    }
  }

  getPeople(
    options: querystring.ParsedUrlQueryInput & GetPeopleOptions = {
      per_page: 10,
      include_paging_counts: true,
      page: 1,
    }
  ): Promise<ApiResponse> {
    let qs = options ? '?' + querystring.stringify(options) : ''

    let url = 'people.json' + qs
    let config = {
      method: 'GET',
    }
    return this.request(url, config)
  }
}
