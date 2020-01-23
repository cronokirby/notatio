/**
 * Create a document, and return the string as the ID.
 */
export async function createDocument(): Promise<string> {
  const res = await fetch('/api/document', {
    method: 'post',
    headers: {
      Accept: 'application/json',
    },
  });
  const json = await res.json();
  return json.id;
}
