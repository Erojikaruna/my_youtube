import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/contants";
import { cacheResults } from "../utils/searchSlice";
import { SlMenu } from "react-icons/sl";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { MdOutlineMic } from "react-icons/md";
import { toggleTheme } from "../utils/themeSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const isDarkTheme = useSelector((store) => store.theme.isDarkTheme);

  const dispatch = useDispatch();

  // console.log(searchQuery);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    //console.log(json);
    setSuggestions(json[1]);

    // update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={` fixed top-0 left-0 z-20 flex  justify-between items-center p-2  px-5  w-screen ${
        isDarkTheme ? "bg-[#0f0f0f] text-white" : "bg-slate-50 text-black"
      }`}
    >
      <div className="">
        <div className="flex col-span-1">
          <SlMenu
            className={` mt-3 ${isDarkTheme ? "#fff" : "#000"}`}
            size={20}
            onClick={() => toggleMenuHandler()}
          />

          <a href="/">
            <img
              className={`h-11  p-3 ${isDarkTheme ? " " : ""}`}
              alt="logo"
              src={
                isDarkTheme
                  ? "https://imgs.search.brave.com/EHDLD9McyAne0NhQVLiX12LU04w6luoHeKayeaVKw8Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1NjUwMTQx/NXlvdXR1YmUtcG5n/LWxvZ28ucG5n"
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
              }
            />
          </a>
        </div>
      </div>
      <div className="">
        <div className="flex col-span-9">
          <input
            className={`w-[30rem] p-1 px-4 border border-gray-400 rounded-l-full focus:outline-none focus-within:border-blue-500 ${
              isDarkTheme ? "bg-[#0f0f0f]  " : "bg-white"
            }`}
            type="text"
            placeholder="Search"
            value={searchQuery}
            // onClick={(e) => setSearchQuery(e.target.value)}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border   border-gray-400  px-5  rounded-r-full">
            <CiSearch className="cursor-pointer" size={20} />
          </button>
          <MdOutlineMic className="cursor-pointer ml-3" size={30} />
        </div>

        {showSuggestions && (
          <div
            className={`py-2 px-3 m-2 w-[400px]  rounded-lg  absolute ${
              isDarkTheme ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
            }`}
          >
            <ul>
              {suggestions.map((s) => (
                <li
                  key={s}
                  className="py-2 px-3 shadow-sm  hover:bg-neutral-400"
                >
                  🔍{s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex  col-span-2 space-x-1 gap-3 items-center">
        <button
          className={`rounded-full p-2 h-11 ${
            isDarkTheme ? "" : "bg-gray-100 "
          }`}
          onClick={toggleThemeHandler}
        >
          {isDarkTheme ? "⛅" : "🌛"}
        </button>
        <RiVideoAddLine className="cursor-pointer " size={25} />
        <IoMdNotificationsOutline className="cursor-pointer" size={25} />
        <HiOutlineUserCircle className="cursor-pointer" size={25} />
      </div>
    </div>
  );
};

export default Header;
