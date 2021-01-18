import { log } from 'frontapp/libs/logger'

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
    log('error', error)
    return {
      code: responseData.status,
      data: undefined
    }
  }
}

interface JsonObject {
  [key: string]: any
}

function buildQueryString(queryParams: JsonObject): string {
  const params = Object.keys(queryParams)
  if (params.length === 0) {
    return ""
  }

  const esc = encodeURIComponent
  return "?" + params
    .map((k) => esc(k) + '=' + esc(queryParams[k]))
    .join('&')
}

/**
 * Ensure that anything coming in actually has the type of what we are asking for
 *
 * Usage:
 * Pass in an object original and something from the API. You never know what the api will send you
 * So we filter out any attributes we werent expecting by passing in the object to overwrite
 * and only updating those fields
 *
 */
export function mergeIntersect<T>(original: T, newValues: JsonObject) {
  return Object.keys(original).reduce(
    (object, key) => ({ ...object, [key]: newValues[key] }), original
  ) as T
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
      log('error', error)
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
      log('error', error)
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
      log('error', error)
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
      log('error', error)
    }
  },
}
