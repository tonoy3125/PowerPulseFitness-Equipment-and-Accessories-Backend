import jwt, { JwtPayload } from 'jsonwebtoken'

const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  })
}

export default createToken

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload
}
