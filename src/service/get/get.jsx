import Config from "../../config/config";

export async function getAPIData(api, setLoading) {
  return fetch(`${Config.API_URL[api]}`, Config.headerAuth)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        setLoading(false);
        throw Error(response.statusText);
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export async function getTextAPIData(api, setLoading) {
  return fetch(`${Config.API_URL[api]}`, Config.headerTextAuth)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        setLoading(false);
        throw Error(response.statusText);
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
