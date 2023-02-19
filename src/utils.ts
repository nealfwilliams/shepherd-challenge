export const post = async(url: string, body: Object) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json'
    }
  });
  const json = await response.json();
  return json;
}

export const get = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}