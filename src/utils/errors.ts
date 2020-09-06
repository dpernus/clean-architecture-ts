type CustomError = {
  code: string
  message: string
  baseError?: Error
}

export const makeError = (code: string, message: string, baseError?: Error): CustomError => {
  console.log(`Code: ${code} || Message: ${message} || Error: ${baseError?.message}`)
  return { code, message, baseError }
}
