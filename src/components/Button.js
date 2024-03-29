import React from "react";
import { useSelector } from "react-redux";

const Button = ({ name }) => {
  const theme = useSelector((store) => store.theme.isDarkTheme);
  return (
    <button
      className={`rounded-lg  font-semibold hover:bg-[#eaeaea]  mr-[12px] height-[32px] whitespace-nowrap flex align-middle justify-center px-[12px] py-[6px] text-[13px] text-center ${
        theme
          ? "bg-zinc-800 hover:text-black  border-gray-600"
          : "text-black bg-[#f5f5f5]"
      }`}
    >
      {name}
    </button>
  );
};

export default Button;
