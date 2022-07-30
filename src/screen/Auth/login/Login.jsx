import React, { lazy, useEffect } from "react";
import { BiLogInCircle, BiLockOpenAlt } from "react-icons/bi";
import Config from "../../../config/Config";
import Theme from "../../../resources/Theme/Theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Button = lazy(() => {
  return import("../../../resources/Form/button");
});
const Input = lazy(() => {
  return import("../../../resources/Form/input");
});

const baseUrl = process.env.PUBLIC_URL;

function Login() {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [password, setPassword] = React.useState({
    username: "",
    password: "",
  });
  const [show, setShow] = React.useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPassword({ ...password, [name]: value });
    setError("");
  };
  const handleClickShowPassword = () => {
    setShow(!show);
  };
  const LoginInputField = [
    {
      label: "Email",
      name: "username",
      required: true,
      type: "email",
      max: 50,
      number: false,
    },
    {
      label: "Password ",
      name: "password",
      required: true,
      type: "password",
      types: "confirm_password",

      max: 50,
      number: false,
    },
  ];
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const re = /\S+@\S+\.\S+/;
    const isEnabled = re.test(password.username);

    if (password.password.length <= 7) {
      setLoading(false);
      setError("Password must be at least 8 characters");
    } else {
      if (isEnabled) {
        axios({
          method: "POST",
          url: Config.API_URL._loginAPI,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: `grant_type=${process.env.REACT_APP_GRANT_TYPE}&username=${password.username}&password=${password.password}&client_id=${process.env.REACT_APP_CLIENT_ID}`,
        })
          .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
              // Saving the token in cookie to use it in other components
              navigate("/otp/verification/", {
                state: {
                  first_time: response.data.first_time,
                  qrcode: response.data.qr_code,
                  token: response.data.access_token,
                  user_type: response.data.user_type,
                },
              });
            }
          })
          .catch((reject) => {
            if (reject.response) {
              setLoading(false);
              setError(reject.response.data.message);
            }
          });
      } else {
        setLoading(false);
        setError("Please enter a valid email");
      }
    }
  };

  useEffect(() => {
    redirect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirect = () => {
    if (Config.isValidToken) {
      navigate(baseUrl + "/");
      window.location.reload();
    }
  };
  const ForgetPassword = () => {
    window.location.href = baseUrl + "/forget-password/";
  };
  // const regiterData = () => {
  //   window.location.href = baseUrl + "/register/";
  // };
  // const homeSection = () => {
  //   window.location.href = baseUrl + "/";
  // };
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
            Login to your account
          </h2>
          <div class="px-5 py-4 ">
            {LoginInputField.map((item, index) => (
              <div className="mt-1 " key={index + 1}>
                <Input
                  item={item}
                  handleChange={handleInputChange}
                  className={""}
                  handleClickShowPassword={handleClickShowPassword}
                  shows={show}
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
                disabled={loading ? true : false}
                name={loading ? "Loading ..." : "Continue"}
                Icon={<BiLogInCircle />}
              />
            </div>
          </div>
          <div class="py-2">
            <div class="">
              <div class="text-center sm:text-left whitespace-nowrap">
                <button
                  onClick={ForgetPassword}
                  class=" flex  mx-5  pt-1 pb-2 cursor-pointer font-normal text-sm  text-gray-500 "
                >
                  <span className="text-lg">
                    <BiLockOpenAlt />
                  </span>
                  <span class="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
              {/* <div class="text-center sm:text-right  whitespace-nowrap">
                <button
                  onClick={regiterData}
                  class=" flex mx-5 pb-2 py-1  cursor-pointer font-normal text-sm  text-gray-500  "
                >
                  <span className="text-lg">
                    <BiHelpCircle />
                  </span>
                  <span class="inline-block ml-1">Don't have account ?</span>

                  <span className="pl-1 font-bold text-light500">
                    Register here
                  </span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
