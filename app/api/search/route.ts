import { NextRequest, NextResponse } from "next/server";
import type { Movie } from "@/types";

// Filters a collection -> query string
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q) return NextResponse.json({ error: "Missing query" }, { status: 400 });
  // Defaults to non-adult movies, en-US movies, 1 page result
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${q}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    },
  );

  if (!res.ok)
    return NextResponse.json(
      { error: "Failed to fetch searc results" },
      { status: 502 },
    );

  const { results } = await res.json();

  // Keep what is needed for the frontend
  const trimmed = results.map((m: Movie) => ({
    id: m.id,
    title: m.title,
    overview: m.overview,
    release_date: m.release_date,
    poster_path: m.poster_path,
  }));

  return NextResponse.json({ results: trimmed });
}
