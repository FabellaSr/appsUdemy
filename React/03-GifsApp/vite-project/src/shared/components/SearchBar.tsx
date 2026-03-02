import { useState } from "react";

interface Props {
  descripcion: string;
  onQuery: (query: string) => void;
}
export const SearchBar = ({ descripcion, onQuery }: Props) => {
  const [query, setQuery] = useState('')
  return (
    <div>
      <input
        type="text"
        placeholder={descripcion}
        value={query}
        onChange={(e) => {
          setQuery
        }} />

      <button>{descripcion}</button>
    </div>
  )
}
