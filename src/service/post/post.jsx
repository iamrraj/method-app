import Config from "../../config/config";
import axios from "axios";

export async function simpleAddData(setdata, api, setError, setLoading) {
  setLoading(true);
  axios({
    method: "POST",
    url: `${Config.API_URL[api]}`,
    headers: Config.headerAxios,
    data: setdata,
  })
    .then(async (response) => {
      if (response.status >= 200 && response.status <= 299) {
        setError({ success: "Data Has been register", thank: true });
        setLoading(false);
        return response.json();
      }
    })
    .catch((error) => {
      setLoading(false);
      const errormessa = error.response.data.message;

      setError({ error: errormessa });
    });
}
