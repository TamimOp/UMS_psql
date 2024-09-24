import { serialize } from "cookie";

export function createCookie(token, maxAge = 60 * 60) {
  return serialize("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge,
    path: "/",
  });
}
