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
    return {
      code: responseData.status,
      data: undefined
    }
  }
}

interface Params {
  [key: string]: any
}

function buildQueryString(queryParams: Params): string {
  const params = Object.keys(queryParams)
  if (params.length === 0) {
    return ""
  }

  let esc = encodeURIComponent;
  return "?" + params
    .map(k => esc(k) + '=' + esc(queryParams[k]))
    .join('&');
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
  get: async <T>(path: string, query = {}, headers = {}) => {
    let response
    try {
      response = await fetch(path + buildQueryString(query), {
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
