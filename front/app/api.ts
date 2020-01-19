const baseHeaders = {
  "Accept": 'application/json',
  'Content-Type': 'application/json',
}

async function buildResults<T>(responseData: Response):
  Promise<{ code: number, data: T }> {
  try {
    return {
      code: responseData.status,
      data: await responseData.json(),
    }
  } catch (error) {
    console.warn(error)
  }
}

/**
 * Simple wrapper over http fetch function
 *
 * Usage:
 * import api in component that receives rails authenticity token
 * set the token with api.setToken
 * call the async rest method
 * buildResults will ensure a code and a data element are returned or it will be undefined
 *
 */
export default {
  delete: async <T>(path: string, body = {}, headers = {}) => {
    let response
    try {
      response = await fetch(path, {
        method: 'DELETE',
        headers: { ...baseHeaders, ...headers },
      })
      return await buildResults<T>(response)
    } catch (error) {
      console.warn(error)
    }
  },
  get: async <T>(path: string, body = {}, headers = {}) => {
    let response
    try {
      response = await fetch(path, {
        method: 'GET',
        headers: { ...baseHeaders, ...headers },
      })
      return await buildResults<T>(response)
    } catch (error) {
      console.warn(error)
    }
  },
  put: async <T>(path: string, body = {}, headers = {}) => {
    let response
    try {
      response = await fetch(path, {
        method: 'PATCH',
        body: JSON.stringify({
          ...body,
        }),
        headers: { ...baseHeaders, ...headers },
      })
      return await buildResults<T>(response)
    } catch (error) {
      console.warn(error)
    }
  },
  post: async <T>(path: string, body = {}, headers = {}) => {
    let response
    try {
      response = await fetch(path, {
        method: 'POST',
        body: JSON.stringify({
          ...body,
        }),
        headers: { ...baseHeaders, ...headers },
      })
      return await buildResults<T>(response)
    } catch (error) {
      console.warn(error)
    }
  },
}
