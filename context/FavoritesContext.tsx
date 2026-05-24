// Avoid prop drilling to MovieModal and FavoritesPanel
"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { Movie, Favorite } from "@/types";

type FavoritesContextType = {
  // movie id: {movie, rating, note}
  favorites: Record<number, Favorite>;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  updateRating: (id: number, rating: number) => void;
  updateNote: (id: number, note: string) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Record<number, Favorite>>(() => {
    if (typeof window === "undefined") return {};
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : {};
  });

  // Write to localStorage when favorite changes or loaded
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) => ({
      ...prev,
      [movie.id]: { movie, rating: 0, note: "" },
    }));
  };

  const removeFavorite = (id: number) =>
    setFavorites((prev) => {
      // Delete via destructing
      const { [id]: _, ...rest } = prev;
      return rest;
    });

  const updateRating = (id: number, rating: number) =>
    setFavorites((prev) => ({ ...prev, [id]: { ...prev[id], rating } }));

  const updateNote = (id: number, note: string) =>
    setFavorites((prev) => ({ ...prev, [id]: { ...prev[id], note } }));

  const isFavorite = (id: number) => id in favorites;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        updateRating,
        updateNote,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
