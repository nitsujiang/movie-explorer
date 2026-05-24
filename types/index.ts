export type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
};

export type Favorite = {
  movie: Movie;
  rating: number;
  note: string;
};
