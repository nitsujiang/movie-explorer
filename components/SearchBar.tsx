"use client";
import { useState } from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "@/types";

type Props = {
  onSelect: (id: number) => void;
};

export default function SearchBar({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResults(data.results);
      setError(null);
    } catch {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search movies..."
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {results.length === 0 && query.trim() && <p>No results found.</p>}
      <div>
        {results.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onSelect(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}
