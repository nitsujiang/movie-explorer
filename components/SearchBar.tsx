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
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search movies..."
          className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {results.length === 0 && query.trim() && (
        <p className="text-gray-400 text-sm italic">No results found.</p>
      )}
      <div className="flex flex-col gap-3">
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
