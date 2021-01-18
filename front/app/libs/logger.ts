type LogLevelType =
  'debug' |
  'error' |
  'info' |
  'log' |
  'trace' |
  'warn'

export const log = (logLevel: LogLevelType, ...args: any[]) => {
  console[logLevel](...args)
}
