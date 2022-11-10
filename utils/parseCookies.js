import cookie from "cookie"

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
  // return cookie.parse(req ? "hello" : document.cookie)
}