import React, { lazy, useEffect } from "react";
import { BiLogInCircle } from "react-icons/bi";
import Theme from "../../../resources/Theme/Theme";
import Config from "../../../config/Config";
import Cookies from "universal-cookie";
import axios from "axios";

import { useNavigate, useLocation } from "react-router-dom";

const Button = lazy(() => {
  return import("../../../resources/Form/button");
});
const Input = lazy(() => {
  return import("../../../resources/Form/input");
});

const cookies = new Cookies();
const baseUrl = process.env.PUBLIC_URL;

//  cookies.set("@method_storage_access_token", response.data.access_token, {
//    path: "/",
//    maxAge: 36000,
//  });

function Otp() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [password, setPassword] = React.useState({
    otp: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPassword({ ...password, [name]: value });
    setError("");
  };

  if (state?.token === undefined) {
    navigate("/");
  }
  const LoginInputField = [
    {
      label: "Verification code",
      name: "otp",
      required: true,
      type: "text",
      max: 6,
      number: true,
    },
  ];
  const handleSubmit = (e) => {
    console.log("dfdf", state?.token);
    setLoading(true);
    e.preventDefault();

    if (password.otp?.length !== 6) {
      setLoading(false);
      setError("Please enter valid OTP");
    } else {
      axios
        .get(`${Config.API_URL._verificationAPI}${password?.otp}/`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer  ${state.token}`,
          },
        })
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            // Saving the token in cookie to use it in other components
            cookies.set(
              "@method_storage_access_token",
              response.data.access_token,
              {
                path: "/",
                maxAge: 36000,
              }
            );
            redirect();
          }
        })
        .catch((reject) => {
          if (reject.response) {
            setLoading(false);
            setError(reject.response.data.message);
          }
        });
    }
  };
  useEffect(() => {
    redirect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirect = () => {
    if (cookies.get("@method_storage_access_token")) {
      navigate(baseUrl + "/");
      window.location.reload();
    }
  };

  return (
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 class="font-bold text-center text-2xl mb-5">
          <img
            src={Theme.Logo.Black}
            alt="Logo"
            class="w-36  mt-1  ml-2  inline-flex"
          />
        </h1>
        <div class="bg-white  w-full rounded-lg shadow-xl divide-y divide-gray-200">
          <h2 class="text-xl font-bold text-gray-800 text-left py-5 pl-4 ">
            Login to Method APP
          </h2>
          <div class="px-5 py-4 ">
            {state?.first_time ? (
              <div>
                <p className="text-sm">
                  Scan thr QR code below using your preferred Authenticator app
                  and enter the provided one time verification code
                </p>
                <img
                  src={state?.qrcode}
                  alt="QR Code"
                  class="w-56 h-52 mx-auto"
                />
              </div>
            ) : (
              <div className="py-3 mb-4">
                <p className="text-base">Provided one time verification code</p>
              </div>
            )}
            {LoginInputField.map((item, index) => (
              <div className="mt-1 " key={index + 1}>
                <Input
                  item={item}
                  handleChange={handleInputChange}
                  className={""}
                  label={false}
                />
              </div>
            ))}
            {error && (
              <p className="text-red-500 -mt-2 text-sm text-left ">{error}</p>
            )}
            <div className="  text-center py-2 ">
              <Button
                click={handleSubmit}
                name={loading ? "Loading ..." : "Continue"}
                Icon={<BiLogInCircle />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
