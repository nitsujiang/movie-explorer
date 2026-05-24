"use client";
import { useState, useEffect } from "react";
import { useFavorites } from "@/context/FavoritesContext";
import Image from "next/image";
import type { Movie } from "@/types";

type Props = {
  movieId: number;
  onClose: () => void;
};

export default function MovieModal({ movieId, onClose }: Props) {
  const [movie, setMovie] = useState<
    (Movie & { runtime: number | null }) | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const {
    isFavorite,
    addFavorite,
    removeFavorite,
    updateRating,
    updateNote,
    favorites,
  } = useFavorites();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movie/${movieId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setMovie(data);
      } catch {
        setError("Failed to load movie details.");
      }
    };
    fetchMovie();
  }, [movieId]);

  if (error)
    return (
      <div onClick={onClose}>
        <p>{error}</p>
      </div>
    );
  if (!movie) return <div>Loading...</div>;

  const favorite = favorites[movieId];

  return (
    <div onClick={onClose}>
      {/* Prevents bubbling up the DOM*/}
      <div onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>✕</button>
        <Image
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
        />
        <h2>{movie.title}</h2>
        <p>
          {movie.release_date?.slice(0, 4)}
          {movie.runtime && ` · ${movie.runtime} min`}
        </p>
        <p>{movie.overview}</p>
        <button
          onClick={() =>
            isFavorite(movieId) ? removeFavorite(movieId) : addFavorite(movie)
          }
        >
          {isFavorite(movieId) ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        {isFavorite(movieId) && (
          <div>
            <input
              type="number"
              min={1}
              max={5}
              value={favorite?.rating || ""}
              onChange={(e) => updateRating(movieId, Number(e.target.value))}
              placeholder="Rating 1-5"
            />
            <textarea
              value={favorite?.note || ""}
              onChange={(e) => updateNote(movieId, e.target.value)}
              placeholder="Add a note..."
            />
          </div>
        )}
      </div>
    </div>
  );
}
