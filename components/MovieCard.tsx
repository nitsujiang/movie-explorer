"use client";
import Image from "next/image";
import type { Movie } from "@/types";

type Props = {
  movie: Movie;
  onClick: () => void;
};

export default function MovieCard({ movie, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex gap-3 p-3 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        width={80}
        height={120}
        className="rounded object-cover shrink-0"
      />
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-base">{movie.title}</h3>
        {/* Extract just the year */}
        <p className="text-gray-400 text-sm">
          {movie.release_date?.slice(0, 4)}
        </p>
        <p className="text-gray-300 text-sm line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
}
