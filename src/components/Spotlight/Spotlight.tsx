import React, { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import ReactPlayer from "react-player";
import type { ApodData } from "../../types";
import { FaPlayCircle } from "react-icons/fa";
import Overlay from "../Overlay/Overlay";
import "./Spotlight.css";

interface Props {
  apodData: ApodData
}
const getTruncatedString = (str: string): string => {
  const strArray = str.split(".");
  return `${strArray[0]}. ${strArray[1]}.`;
};

export default function Spotlight(props: Props): JSX.Element {
  const { apodData } = props;

  const {
    title,
    explanation,
    date,
    media_type,
    copyright,
    url,
    thumbnail_url,
  } = apodData;
  const truncatedExplanation = getTruncatedString(explanation);

  const [viewMedia, setViewMedia] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="spotlight my-8 py-10 mx-4 md:py-40 md:px-12 md:mx-8 flex flex-wrap justify-center content-center items-center md:gap-12"
    >
      <div className="spotlight-left p-10">
        <h1 className="text-4xl text-white font-bold font-sans">{title}</h1>
        <article className="mt-4 prose text-lg font-serif text-white">
          {truncatedExplanation}
        </article>
        <p className="mt-8 text-white text-xl font-semibold font-sans">
          Author: <span className="font-serif">{copyright}</span>
        </p>
      </div>
      <div className="spotlight-right">
        <div
          className="spotlight-media-wrapper cursor-pointer"
          onClick={() => {
            setViewMedia(true);
          }}
        >
          {media_type === "image" && (
            <img
              src={url}
              loading="lazy"
              alt={title}
              className="w-full max-w-[480px]"
            />
          )}
          {media_type === "video" && (
            <div className="video-thumbnail-wrapper relative">
              {" "}
              <img src={thumbnail_url} className="w-full max-w-[480px]" />
              <div className="video-thumbnail-play-button absolute top-1/4 left-0 1/4-full w-full flex justify-center items-center">
                <FaPlayCircle className="text-xl text-white" />
              </div>
            </div>
          )}
        </div>
        {viewMedia &&
          createPortal(
            <AnimatePresence>
              <Overlay onClose={() => setViewMedia(false)} key={date}>
                {
                  media_type === "image" && (
                <img src={url} alt={title} />)}
                {media_type === "video" && (
                  <ReactPlayer url={url} controls={true}/>
                )}
              </Overlay>
            </AnimatePresence>,
            document.body
          )}
      </div>
    </motion.div>
  );
}
