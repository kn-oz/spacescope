import React from "react";
import { FaPlayCircle } from "react-icons/fa";

type mediaProps = {
  [src: string]: string | undefined;
};

export default function MediaPreview(props: mediaProps) {
  const { url, title, media_type, thumbnail_url } = props;
  return (
    <>
      {media_type === "image" && (
        <img
          src={url}
          loading="lazy"
          alt={title}
          className="h-80 w-94 object-cover"
        />
      )}
      {media_type === "video" && (
        <div className="video-thumbnail-wrapper relative">
          {" "}
          <img src={thumbnail_url} className="h-80 w-94 object-cover" />
          <div className="video-thumbnail-play-button absolute top-1/4 left-0 1/4-full w-full flex justify-center items-center">
            <FaPlayCircle className="text-xl text-white" />
          </div>
        </div>
      )}
    </>
  );
}
