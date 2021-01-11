import type { NextApiRequest, NextApiResponse } from 'next'

import Api from '../../helpers/api'

// Interfaces
import { ApiResponse } from '../../interfaces'

export const config = {
  api: {
    externalResolver: true,
  },
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const { page = 1, perPage = 10 } = req.query

  const api = new Api({
    apiBaseUrl: process.env.SALESLOFT_API_URL,
    apiKey: process.env.SALESLOFT_API_KEY,
  })

  try {
    const result = await api.getPeople({
      include_paging_counts: true,
      per_page: Number(perPage),
      page: Number(page),
    })

    return res.status(200).json(result)
  } catch (err) {
    throw new Error(err)
  }
}
