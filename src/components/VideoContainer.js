import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/contants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const theme = useSelector((store) => store.theme.isDarkTheme);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    //console.log(json.items);
    setVideos(json.items);
  };

  return (
    <div>
      <div
        className={`flex  flex-wrap overflow-hidden justify-around  ${
          theme ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
        }`}
      >
        {videos.map((video) => (
          <Link key={video.id} to={"/watch?v=" + video.id}>
            <VideoCard info={video} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoContainer;

// className=" ml-32 flex relative flex-wrap gap-4 p-5 justify-start "

// className=" ml-32 flex relative flex-wrap gap-4 p-5 justify-start "
