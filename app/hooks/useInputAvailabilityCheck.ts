export default async function useInputAvailabilityCheck(
  url: string,
  body: { [key: string]: string }
): Promise<boolean> {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return response;
}
