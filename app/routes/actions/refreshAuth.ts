export default async function refreshAuth(request: Request) {
  return await fetch("http://localhost:8000/auth/refresh", {
    headers: request.headers,
    credentials: "include",
  });
}
