import * as util from 'util'

export const log = (value: any) => {
  console.log(
    util.inspect(value, false, null, true)
  )
}
