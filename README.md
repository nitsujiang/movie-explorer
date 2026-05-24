# Movie Explorer

A simple web app to search movies, view details, and save favorites with personal ratings and notes.

## Live app

[movie-explorer](https://movie-explorer-psi-ruby.vercel.app)

## Setup & Run

1. Clone the repo
2. Install dependencies
3. Add environment variables (e.g., TMDB_ACCESS_TOKEN=your_token_here)
4. Run the development server (e.g., npm run dev)

## Getting a TMDB API Key

1. Create a free account at themoviedb.org
2. Go to Settings → API
3. Copy the API Read Access Token

## Technical Decisions & Tradeoffs

**API Proxy**
All TMDB requests go through Next.js route handlers at /api/search and /api/movie/[id]. The browser never calls TMDB directly and the access token never leaves the server. However, the tradeoff becomes the one extra network hop per request.

**State Management**
Favorites are managed with React Context and a custom useFavorites hook. Context was sufficient for this scale and avoids prop drilling. The favorites state is only consumed by MovieModal and FavoritesPanel, so a heavier solution is unnecessary. The state shape is a Record<number, Favorite> keyed by movie ID, which gives O(1) lookup for isFavorite checks instead of scanning an array on every render.

**Persistence**
Favorites are persisted client-side via localStorage. This requires zero infrastructure and significantly decreased complexity. The tradeoff is that favorites are tied to one browser and lost if the user clears storage.

**Modal vs Page**
Movie details render in a modal rather than a dedicated /movies/[id] route. This keeps the user on the search results, requires no additional routing, and was faster to implement. The tradeoff is that detail views aren't shareable via URL.

**Search**
Search uses an explicit button rather than debounced input. This avoids debounce complexity and race conditions while keeping the implementation simple. The tradeoff is slightly worse UX compared to search results as you type.

## Known Limitations

- Favorites are browser-specific and are lost if you switch browsers, devices, or clear browser storage
- Detail views have no shareable URL
- No pagination on search results
- No authentication or user accounts
- Broken poster images if TMDB returns null for poster_path

## What I'd Add With More Time

- Server-side persistence with Supabase for cross-device favorites
- NextAuth for user accounts
- /movies/[id] route for shareable detail pages
- Pagination on search results
- Better error states with retry buttons
