"use client";
import Image from "next/image";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesPanel() {
  const { favorites, removeFavorite, updateRating, updateNote } =
    useFavorites();

  const favoritesList = Object.values(favorites);

  if (favoritesList.length === 0) return <p>No favorites yet.</p>;

  return (
    <div>
      <h2>My Favorites</h2>
      {favoritesList.map(({ movie, rating, note }) => (
        <div key={movie.id}>
          <Image
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            width={100}
            height={150}
          />
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.slice(0, 4)}</p>
          <button onClick={() => removeFavorite(movie.id)}>★ Remove</button>
          <input
            type="number"
            min={1}
            max={5}
            value={rating || ""}
            onChange={(e) => updateRating(movie.id, Number(e.target.value))}
            placeholder="Rating 1-5"
          />
          <textarea
            value={note}
            onChange={(e) => updateNote(movie.id, e.target.value)}
            placeholder="Add a note..."
          />
        </div>
      ))}
    </div>
  );
}
