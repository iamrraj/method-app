import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Input(props) {
  const {
    item,
    className,
    handleChange,
    handleClickShowPassword,
    shows,
    error,
    data,
    label,
  } = props;
  const LabelCsss =
    "text-login text-base mb-1 dark:text-white  select-none font-medium opacity-80 flex tracking-wider ";
  const styleEye = {
    color: "#000",
    fontSize: "21px",
  };
  return (
    <div className="relative w-full group  mb-1 pb-4">
      <label htmlFor={item.name} className={LabelCsss}>
        {item.label}
        <span className="required_field text-red-500">
          {item.required ? "*" : ""}
        </span>
      </label>

      <input
        type={
          item.type === "password" ? (shows ? "text" : "password") : item.type
        }
        name={item.name}
        onKeyPress={
          item.number
            ? (event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }
            : ""
        }
        maxLength={item.max}
        defaultValue={data ? data[item.name] : ""}
        placeholder={item.label}
        onChange={(e) => handleChange(e)}
        className={`${className} h-10  px-2.5 py-2 w-full placeholder:text-base  text-login text-base border-1 
        ${error === item.name ? "border-red-500 " : "border-gray-200 "}
        ease-linear transition-all duration-150  focus:outline-none placeholder-blueGray-300  focus:ring-2 focus:ring-Amber focus:border-transparent rounded shadow`}
      />
      <span
        className={`text-xs  ${
          error ? "text-red-500" : "text-apple dark:text-white "
        }`}
      >
        {error === item.name ? "Field is required" : ""}
      </span>
      <span
        className={`text-xs ${
          error === "password" ? "text-red-500" : "text-apple dark:text-white "
        }   `}
      >
        {item.helpText ? item.helpText : ""}
      </span>

      {item.types === "confirm_password" && (
        <span
          className={`absolute right-0 inset-y-10  mr-2 flex items-center pl-3 cursor-pointer ${
            item?.className ? item?.className : "mt-2"
          }`}
          onClick={handleClickShowPassword}
        >
          {shows ? (
            <AiFillEye style={styleEye} className="forget_text" />
          ) : (
            <AiFillEyeInvisible style={styleEye} className="forget_text" />
          )}
        </span>
      )}
    </div>
  );
}

export default Input;
