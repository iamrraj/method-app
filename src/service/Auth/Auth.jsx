import Config from "../../config/Config";
import axios from "axios";
import Cookies from "universal-cookie";
const cookie = new Cookies();

const baseUrl = process.env.PUBLIC_URL;

// Function to remove token and logout user
export async function getRemoveToken() {
  axios({
    method: "POST",
    url: Config.API_URL._logoutAPI,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: `token=${Config.isValidTokne}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`,
  })
    .then((response) => {
      if (response.status === 200) {
        cookie.remove("@method_storage_access_token", { path: "/" });
        window.location.href = baseUrl + "/";
      }
    })
    .catch((reject) => {
      console.log(reject);
    });
}

// Function to FORGET PASSWORD API
export async function forgetPassword(product, setLoading, setError) {
  let country = new Promise((resolve, reject) => {
    setLoading(true);
    axios({
      method: "POST",
      url: Config.API_URL._forgetPassword,
      headers: Config.headeJust,
      data: product,
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          setLoading(false);
          setError({ success: response.data.message });

          //settimeout to redirect to login page
          setTimeout(() => {
            window.location.href = baseUrl + "/";
          }, 3000);

          resolve(response.json());
        }
      })
      .catch((reject) => {
        if (reject.response) {
          setLoading(false);
          setError({ error: reject.response.data.message });
        }
      });
  });
  return country;
}

// Function to confirm the  2FA code and redirect to dashboard
export async function confirmOTP(product, setError, setLoading, token) {
  setLoading(true);
  let country = new Promise((resolve, reject) => {
    axios({
      url: Config.API_URL._confirmOTPAPI,
      method: "POST",
      headers: Config.headerWihtoutAxios,
      data: product,
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          setLoading(false);
          cookie.set("@dark_storage_access_token", token, {
            path: "/",
            maxAge: 36000,
          });
          window.location.href = baseUrl + "/";
        }
        resolve(response.json());
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);

          setError({ error: error.response?.data?.message });
        }
      });
  });
  return country;
}

// Function to send the OTP to the user
export async function requestOTP(product, setError, authToken) {
  setError("");
  let country = new Promise((resolve, reject) => {
    axios({
      url: Config.API_URL._requestOTPAPI,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
        "Accept-Language": window.localStorage.i18nextLng,
      },
      data: product,
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          setError({ success: response.data.message });
        }
        resolve(response.json());
      })
      .catch((error) => {
        if (error.response) {
          setError({ error: error.response.data.message });
        } else {
          console.log(error);
        }
      });
  });
  return country;
}

export async function newPassword(product, setLoading, setError) {
  let country = new Promise((resolve, reject) => {
    setLoading(true);
    axios({
      url: Config.API_URL._changePassword,
      method: "POST",
      headers: Config.headeJust,
      data: product,
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          setLoading(false);
          setError({ success: response.data.message });
        } else {
          console.log("ss");
        }

        resolve(response.json());
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);
          setError({ error: error.response.data.message });
        }
      });
  });
  return country;
}
