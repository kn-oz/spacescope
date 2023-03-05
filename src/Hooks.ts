import { useInfiniteQuery, useQuery } from "react-query";
import { format, add, sub } from "date-fns";
import type { ApodData } from "./types";

const URL = "https://api.nasa.gov/planetary/apod?";
const NASA_APIKEY = "gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7";

const useFetchInfiniteData = (queryKey: Array<string>, date: Date) => {
  return useInfiniteQuery<Array<ApodData>>(
    queryKey,
    async ({ pageParam = date }) => {
      const res = await fetch(
        `${URL}api_key=${NASA_APIKEY}&start_date=${
          pageParam && format(sub(pageParam, { days: 6 }), "yyyy-MM-dd")
        }&end_date=${pageParam && format(pageParam, "yyyy-MM-dd")}&thumbs=true`
      );
      return res.json();
    },
    {
      getPreviousPageParam: (firstPage) => {
        return new Date(add(new Date(firstPage[0].date), { days: 7 }));
      },
      getNextPageParam: (lastPage) => {
        return new Date(
          sub(new Date(lastPage[lastPage.length - 1].date), { days: 7 })
        );
      },
    }
  );
};

const useFetchData = (queryKey: Array<string>, date: Date) => {
  return useQuery<Array<ApodData>>(
    queryKey,
    async ({ pageParam = date }) => {
      const res = await fetch(
        `${URL}api_key=${NASA_APIKEY}&start_date=${
          pageParam && format(pageParam, "yyyy-MM-dd")
        }&end_date=${pageParam && format(pageParam, "yyyy-MM-dd")}&thumbs=true`
      );
      return res.json();
    }
  );
};

export { useFetchInfiniteData, useFetchData };
