export const fetchBackend = (url, init, token) => {
  const headers = new Headers({
    Authorization: 'Bearer ' + token
  });
  return fetch(url, { ...init, headers: headers });
};
