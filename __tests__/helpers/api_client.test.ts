import Api from '../../helpers/api'

describe('API Client', () => {
  it('should fetch people', async () => {
    const api = new Api({
      apiBaseUrl: process.env.SALESLOFT_API_URL,
      apiKey: process.env.SALESLOFT_API_KEY,
    })

    const { data, metadata } = await api.getPeople({
      per_page: 1,
      include_paging_counts: true,
      page: 1,
    })

    expect(data).not.toBeNull()
    expect(data.length).toBe(1)
    expect(metadata).not.toBeNull()
  })
})
