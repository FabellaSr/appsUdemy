import { useEffect, useState } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}
export const SearchBar = ({ placeholder, onQuery }: Props) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query, onQuery]);

  const handleSearch = () => {
    onQuery(query);
    setQuery('');
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {   
    if (e.key === 'Enter') {
      handleSearch();
    }
  }
  return (
    <div className="search-container">
      <h1>{query}</h1>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
        onKeyDown={handleKeyDown}/>

      <button
        onClick={handleSearch}>{placeholder}</button>
    </div>
  )
}
