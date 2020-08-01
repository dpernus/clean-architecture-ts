export const makeError = (code: string, message: string, baseError?: Error) => {
  console.log(`Code: ${code} || Message: ${message} || Error: ${baseError?.message}`)
  return { code, message, baseError }
}