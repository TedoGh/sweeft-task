import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ImageCardList from "../components/ImageCardList/ImageCardList";
import Search from "../components/Search/Search";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useSearchHistory from "../hooks/useSearchHistory";
import axios from "axios";

interface ImageData {
  urls: {
    regular: string;
    full: string;
  };
  likes: number;
}

const History = () => {
  const [query, setQuery] = useState<string>("");
  const perPage: number = 20;
  const [images, setImages] = useState<ImageData[]>([]);
  const { page, setPage } = useInfiniteScroll();
  const { searchHistory } = useSearchHistory();

  const searchApi = `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}&per_page=${perPage}`;

  const fetchImages = async () => {
    try {
      const response = await axios.get(searchApi);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching images: ", error);
      throw error;
    }
  };

  const queryKey = ["images", page, searchApi];

  const { data } = useQuery<ImageData[], Error>({
    queryKey,
    queryFn: () => fetchImages(),
    placeholderData: keepPreviousData,
    staleTime: 5 * (60 * 1000),
    refetchOnWindowFocus: false,
  });

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    setPage(1);
  };

  const handleHistoryClick = (searchTerm: string) => {
    setQuery(searchTerm);
  };

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
      {searchHistory.length === 0 ? (
        <div style={{ padding: "50px 0", textAlign: "center" }}>
          <h1>You have not searched for any photos yet</h1>
        </div>
      ) : (
        <div>
          <Search
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(e.target.value)
            }
          />

          <div style={{ textAlign: "center" }}>
            <div>
              <h2>Searched words</h2>
            </div>
            <div>
              {searchHistory.map((item, index) => (
                <button key={index} onClick={() => handleHistoryClick(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            {query && images.length > 0 && <ImageCardList data={images} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
