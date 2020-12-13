async function fetchBackend(context) {
  const headers = new Headers({
    Authorization: 'Bearer ' + context.token
  });
  if (context.method) {
    return await fetch(context.url, {
      headers: headers,
      method: context.method
    });
  }
  return await fetch(context.url, { headers: headers });
}

export default fetchBackend;
