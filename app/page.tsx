"use client";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import MovieModal from "@/components/MovieModal";
import FavoritesPanel from "@/components/FavoritesPanel";

export default function Home() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div>
      <h1>Movie Explorer</h1>
      <SearchBar onSelect={(id) => setSelectedId(id)} />
      <FavoritesPanel />
      {selectedId && (
        <MovieModal movieId={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
