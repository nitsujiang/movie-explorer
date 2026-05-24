"use client";
import Image from "next/image";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesPanel() {
  const { favorites, removeFavorite, updateRating, updateNote } =
    useFavorites();
  const favoritesList = Object.values(favorites);

  if (favoritesList.length === 0)
    return <p className="text-gray-400 text-sm italic">No favorites yet.</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">My Favorites</h2>
      <div className="flex flex-col gap-4">
        {favoritesList.map(({ movie, rating, note }) => (
          <div key={movie.id} className="flex gap-4 p-4 bg-gray-900 rounded-lg">
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              width={100}
              height={150}
              className="rounded object-cover shrink-0"
            />
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="font-semibold text-lg">{movie.title}</h3>
              <p className="text-gray-400 text-sm">
                {movie.release_date?.slice(0, 4)}
              </p>
              <button
                onClick={() => removeFavorite(movie.id)}
                className="text-yellow-400 text-sm w-fit hover:text-red-400"
              >
                ★ Remove
              </button>
              <input
                type="number"
                min={1}
                max={5}
                value={rating || ""}
                onChange={(e) => updateRating(movie.id, Number(e.target.value))}
                placeholder="Rating 1-5"
                className="w-24 px-2 py-1 bg-gray-800 rounded text-sm border border-gray-700 focus:outline-none focus:border-gray-500"
              />
              <textarea
                value={note}
                onChange={(e) => updateNote(movie.id, e.target.value)}
                placeholder="Add a note..."
                className="px-2 py-1 bg-gray-800 rounded text-sm border border-gray-700 focus:outline-none focus:border-gray-500 resize-none h-20"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
