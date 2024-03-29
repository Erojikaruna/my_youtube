import React from "react";
import { useSelector } from "react-redux";

const VideoCard = ({ info }) => {
  //console.log(info);
  const theme = useSelector((store) => store.theme.isDarkTheme);
  const { snippet } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;

  const { viewCount } = info?.statistics;

  return (
    <div
      className={`p-3 w-[24rem] h-70 shadow-lg ${
        theme ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
      }`}
    >
      <img
        className="rounded-lg w-96"
        alt="thumbnail"
        src={thumbnails?.medium?.url}
      />
      <ul className={theme ? "text-white text-md" : " "}>
        <li className=" font-medium truncate">{title}</li>
        <li className="truncate">{channelTitle}</li>
        <li className="text-sm">
          {viewCount.length > 3 &&
            viewCount.length < 7 &&
            viewCount.slice(0, -3) + "K views"}
          {viewCount.length > 6 &&
            (viewCount.slice(0, -5) / 10).toFixed(1) + "M views"}
        </li>

        <li className="text-xs">{publishedAt}</li>
      </ul>
    </div>
  );
};

export default VideoCard;

// className="rounded-lg h-[100px] w-[300px] font-serif"
