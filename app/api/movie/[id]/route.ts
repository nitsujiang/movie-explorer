import { NextRequest, NextResponse } from "next/server";

// Identifies a specific movie, ID belongs in the path
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id)
    return NextResponse.json({ error: "Missing movie id" }, { status: 400 });

  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });

  if (!res.ok)
    return NextResponse.json(
      { error: "Failed to fetch movie details" },
      { status: 502 },
    );

  const movie = await res.json();

  return NextResponse.json({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    release_date: movie.release_date,
    poster_path: movie.poster_path,
    runtime: movie.runtime,
  });
}
