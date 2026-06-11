import { cookies } from "next/headers"
import { COOKIE_NAME, MAX_AGE, signToken, verifyToken, checkPassword } from "./auth-token"

export { COOKIE_NAME, MAX_AGE, signToken, verifyToken, checkPassword }

export function setAdminCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  })
}

export function clearAdminCookie() {
  cookies().delete(COOKIE_NAME)
}

export function isAdminAuthenticated(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value
  return token ? verifyToken(token) : false
}
