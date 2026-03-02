import { useState } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}
export const SearchBar = ({ placeholder, onQuery }: Props) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onQuery(query);
    setQuery('');
  }
  return (
    <div className="search-container">
      <h1>{query}</h1>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)} />

      <button
        onClick={handleSearch}>{placeholder}</button>
    </div>
  )
}
