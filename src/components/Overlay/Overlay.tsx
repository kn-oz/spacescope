import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { TfiClose } from "react-icons/tfi";
import "./Overlay.css";

interface OverlayProps {
  children?: ReactNode;
  onClose?: () => void;
  key?: string;
}

export default function Overlay(props: OverlayProps) {
  const { children, onClose, key } = props;

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="overlay min-h-screen fixed z-[100] inset-0"
    >
      <div className="close-button p-4 cursor-pointer">
        <TfiClose
          className="text-5xl text-white top-4 left-4"
          onClick={onClose}
        />
      </div>
      <div className="overlay-parent-container flex justify-center items-center">
        {props?.children}
      </div>
    </motion.div>
  );
}
