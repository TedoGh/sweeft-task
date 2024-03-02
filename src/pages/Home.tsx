import React, { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ImageCardList from "../components/ImageCardList/ImageCardList";
import Search from "../components/Search/Search";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useDebounce from "../hooks/useDebounce";
import useSearchHistory from "../hooks/useSearchHistory";
import axios from "axios";

interface ImageData {
  urls: {
    regular: string;
    full: string;
  };
  likes: number;
}

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<ImageData[]>([]);
  const { page, setPage } = useInfiniteScroll();
  const debouncedQuery = useDebounce(query, 2000);
  const { addToHistory, searchHistory } = useSearchHistory();

  const perPage: number = 20;
  const apiUrl = `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}&per_page=${perPage}&order_by=popular`;
  const searchApiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}&per_page=${perPage}`;
  const fetchImages = async () => {
    const url = query ? searchApiUrl : apiUrl;

    try {
      const response = await axios.get(url);
      return query ? response.data.results : response.data;
    } catch (error) {
      console.error("Error fetching images: ", error);
      throw error;
    }
  };

  const queryKey = ["images", page, debouncedQuery];
  const { data } = useQuery<ImageData[], Error>({
    queryKey,
    queryFn: fetchImages,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    setPage(1);

    const existsInHistory = searchHistory?.some((term) => term === searchTerm);
    if (!existsInHistory) {
      addToHistory?.(searchTerm);
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setImages(data);
      } else {
        setImages((prevData) => [...prevData, ...data]);
      }
    }
  }, [data]);

  return (
    <div className="container">
      <Search
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />
      <ImageCardList data={images} />
    </div>
  );
};

export default Home;
