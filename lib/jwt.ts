export function jwtSign(payload: any): string {
  const token = Buffer.from(JSON.stringify(payload)).toString('base64')
  return token
}

export function jwtVerify(token: string): any {
  try {
    return JSON.parse(Buffer.from(token, 'base64').toString())
  } catch {
    return null
  }
}
