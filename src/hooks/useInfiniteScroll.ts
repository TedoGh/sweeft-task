import { useState, useEffect } from "react";

const useInfiniteScroll = () => {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const innerHeight = window.innerHeight;

      if (innerHeight + scrollTop + 1 >= scrollHeight) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { page, setPage };
};

export default useInfiniteScroll;
