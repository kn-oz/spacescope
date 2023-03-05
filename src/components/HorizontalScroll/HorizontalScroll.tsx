import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ApodData } from "../../types";
import Card from "../Card/Card";

interface Props {
  apodList: Array<ApodData>
  ref?: React.RefObject<HTMLDivElement>;
}


export default function HorizontalScroll(props: Props) {
  const { apodList } = props;
  const sortedApodList: ApodData[] = [...apodList].reverse();

  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setWidth(carouselRef!.current!.scrollWidth - carouselRef!.current!.offsetWidth);
  }, [])

  return (
    <motion.div ref={carouselRef} className="carousel cursor-grab p-2 overflow-hidden">
      <motion.div drag="x" dragConstraints={{right: 0, left: -width}} className="inner-carousel flex">
        {sortedApodList?.map((apodData) => {
          return (
            <motion.div key={apodData.title + apodData.date} className="carousel-item p-4 min-h-[16rem] min-w-[24rem] pointer-events-none">
              <Card  apodData={apodData} />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
