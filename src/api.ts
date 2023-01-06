export async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (response.ok) {
    return await response.json();
  }

  throw new Error();
}
