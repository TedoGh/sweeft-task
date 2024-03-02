import React from "react";
import "./Search.css";

interface SearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <div className="search">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search images..."
      />
    </div>
  );
};

export default Search;
