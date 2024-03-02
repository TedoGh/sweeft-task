import { useState, useEffect } from "react";

const useSearchHistory = (initialHistory: string[] = []) => {
  const [searchHistory, setSearchHistory] = useState<string[]>(initialHistory);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (item: string) => {
    setSearchHistory((prevHistory) => [...prevHistory, item]);
  };

  return { searchHistory, addToHistory };
};

export default useSearchHistory;
