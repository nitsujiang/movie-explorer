"use client";
import Image from "next/image";
import type { Movie } from "@/types";

type Props = {
  movie: Movie;
  onClick: () => void;
};

export default function MovieCard({ movie, onClick }: Props) {
  return (
    <div onClick={onClick}>
      <Image
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={300}
      />
      <h3>{movie.title}</h3>
      {/* Extract just the year */}
      <p>{movie.release_date?.slice(0, 4)}</p>
      <p>{movie.overview}</p>
    </div>
  );
}
