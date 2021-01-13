import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

// Interfaces
import {
  GetPeopleOptions,
  ApiResponse,
  ApiContructorParams,
} from '../interfaces'

/**
 * This is a class made to handle all the API requests to the SalesLoft API
 * @typeParam ApiContructorParams - This type contains the apiKey and apiBaseUrl needed to made the calls to the SalesLoft API
 */
export default class Api {
  apiKey: string
  apiBaseUrl: string

  constructor({ apiKey, apiBaseUrl }: ApiContructorParams) {
    this.apiKey = apiKey
    this.apiBaseUrl = apiBaseUrl
  }

  /**
   * This is a class made to handle all the API requests to the SalesLoft API
   * @param endpoint - The endpoint you want to reach
   * @param options - An object with multiple options, please refer to this link to see the multiple options available {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options}
   */
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

  /**
   * This is a method calls the 'people.json' enpoint from the People section of the SalesLoft API
   * You can see more info at {@link https://developers.salesloft.com/api.html#!/People/get_v2_people_json}
   * @typeParam ParsedUrlQueryInput & GetPeopleOptions - This is are the options that can be sent to the SalesLoft API based on the
   * documentation. If you want to add more params, please extend or modify the interface <GetPeopleOptions>
   * @returns Promise<ApiResponse>
   */
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
