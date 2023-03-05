import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ApodData } from "../../types";
import MediaPreview from "../MediaPreview/MediaPreview";
import { useState } from "react";
import { createPortal } from "react-dom";
import Overlay from "../Overlay/Overlay";
import Spotlight from "../Spotlight/Spotlight";


interface Props {
  apodData: ApodData;
}

const container = {
  hidden: { opacity: 0 },

  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerDirection: -1,
      duration: 1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function Card(props: Props): JSX.Element {
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

  const [viewInSpotlight, setViewInSpotLight] = useState(false);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      className="bg-primary text-black m-2 p-4 h-full w-full rounded-2xl"
    >
      <motion.div variants={item} className="media-wrapper mb-2" onClick={() => {
        console.log("clicked")
        setViewInSpotLight(true)}}>
        <MediaPreview
          url={url}
          title={title}
          media_type={media_type}
          thumbnail_url={thumbnail_url}
        />
      </motion.div>
      <div className="caption flex justify-between border-t border-dark">
        <p className="title prose">{title}</p>
        <p className="date shrink-0">{date}</p>
      </div>
      {viewInSpotlight &&
          createPortal(
            <AnimatePresence>
              <Overlay onClose={() => setViewInSpotLight(false)} key={date}>
                {" "}
                <Spotlight apodData={apodData} />
              </Overlay>
            </AnimatePresence>,
            document.body
          )}
    </motion.div>
  );
}
