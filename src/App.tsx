import { useState, useRef, useEffect, useCallback } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useFetchData, useFetchInfiniteData } from "./Hooks";
import { sub } from "date-fns";
import "./App.css";
import RootLoader from "./components/RootLoader/RootLoader";
import SquareLoader from "./components/SquareLoader/SquareLoader";
import Header from "./components/Header/Header";
import Spotlight from "./components/Spotlight/Spotlight";
import HorizontalScroll from "./components/HorizontalScroll/HorizontalScroll";

const container = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },

  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerDirection: -1,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

function App() {
  const { ref, inView } = useInView();
  const latestDate = new Date(sub(new Date(), { days: 1 }));

  const {
    data: latestApod,
    error: SpotlightError,
    isFetching: spotlightIsFetching,
  } = useFetchData(["spotlight-apod"], latestDate);

  const endDate = new Date(sub(latestDate, { days: 1 }));

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useFetchInfiniteData(["apods"], endDate);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (!data) {
    return (
      <div className="App bg-dark min-h-screen">
        <RootLoader />
      </div>
    );
  }

  return (
    <div className="App bg-dark min-h-screen">
      <Header />
      {spotlightIsFetching && <RootLoader />}
      {latestApod && <Spotlight apodData={latestApod[0]} />}
      <motion.div
        className="infinite-scroll-container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {data!.pages.map((page, index) => (
          <motion.div variants={item} key={index}>
            <HorizontalScroll apodList={page} />
          </motion.div>
        ))}
        
        <div className="flex justify-center">
          <button
            ref={ref}
            className="text-accent text-center bg-transparent"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? (<SquareLoader />)
              : hasNextPage
              ? "Load Newer"
              : "Nothing more to load"}
          </button>
        </div>
        <div>
          {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
        </div>
      </motion.div>

      <ReactQueryDevtools />
    </div>
  );
}

export default App;
