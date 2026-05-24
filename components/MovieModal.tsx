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
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      >
        <p className="text-red-400">{error}</p>
      </div>
    );

  if (!movie)
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <p className="text-gray-400">Loading...</p>
      </div>
    );

  const favorite = favorites[movieId];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      {/* Prevents bubbling up the DOM */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto flex gap-6"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          width={200}
          height={300}
          className="rounded-lg object-cover shrink-0"
        />
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            {movie.release_date?.slice(0, 4)}
            {movie.runtime && ` · ${movie.runtime} min`}
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            {movie.overview}
          </p>
          <button
            onClick={() =>
              isFavorite(movieId) ? removeFavorite(movieId) : addFavorite(movie)
            }
            className={`w-fit px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isFavorite(movieId)
                ? "bg-yellow-500 text-black hover:bg-yellow-400"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {isFavorite(movieId) ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          {isFavorite(movieId) && (
            <div className="flex flex-col gap-2 mt-2">
              <input
                type="number"
                min={1}
                max={5}
                value={favorite?.rating || ""}
                onChange={(e) => updateRating(movieId, Number(e.target.value))}
                placeholder="Rating 1-5"
                className="w-24 px-2 py-1 bg-gray-800 rounded text-sm border border-gray-700 focus:outline-none focus:border-gray-500"
              />
              <textarea
                value={favorite?.note || ""}
                onChange={(e) => updateNote(movieId, e.target.value)}
                placeholder="Add a note..."
                className="px-2 py-1 bg-gray-800 rounded text-sm border border-gray-700 focus:outline-none focus:border-gray-500 resize-none h-24"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
