import React from "react";

function Button(props) {
  const { name, className, textclass, click, Icon } = props;
  const mainClass =
    "transition flex duration-200 bg-light500 hover:bg-Amber focus:bg-light700 focus:shadow-sm focus:ring-4 focus:ring-blue-700 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center justify-center";
  return (
    <button
      disabled={props.disabled ? true : false}
      className={`${className} ${mainClass}  rounded shadow h-10 relative group `}
      onClick={(e) => click(e)}
    >
      <span className={`${textclass}`}> {name}</span>
      <span className="text-xl pl-1 text-white">{Icon}</span>
    </button>
  );
}

export default Button;
