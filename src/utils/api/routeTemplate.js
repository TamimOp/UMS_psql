import { verifyToken } from "@/utils/api/verifyToken";

export function genericResponse(status, data, key = "message", cookie) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (cookie) {
    headers["Set-Cookie"] = cookie;
  }

  const responseData = key == "null" ? data : { [key]: data };

  return new Response(JSON.stringify(responseData), {
    status,
    headers: headers,
  });
}

export async function genericMethod(req, method, func, errMsg, auth) {
  if (req.method !== method) {
    return genericResponse(405, "Method not allowed");
  }

  if (auth) {
    const { valid } = verifyToken(req);

    if (!valid) {
      return genericResponse(401, "Unauthorized");
    }
  }

  try {
    const data = await func();

    if (data.key) return genericResponse(200, data.data, data.key);
    else return genericResponse(200, data);
  } catch (error) {
    console.error(error);
    return genericResponse(400, errMsg);
  }
}
