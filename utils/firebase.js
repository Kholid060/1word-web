import Auth from 'firebase-auth-lite';

export const auth = new Auth({
  apiKey: process.env.API_KEY,
  redirectUri: `${process.env.BASE_URL}/redirect`
});

export const request = (path, init) => {
  return new Promise((resolve, reject) => {
    auth
      .authorizedRequest(`https://oneword-api.herokuapp.com/api/v1${path}`, {
        ...init,
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((response) => resolve(response.json()))
      .catch((err) => reject(err));
  });
};
