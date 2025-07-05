import { useState } from "react";
import toast from "react-hot-toast";
import { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/Movie.Modal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (newQuery: string) => {
    try {
      setLoading(true);
      setError(false);
      setQuery(newQuery);
      const results = await fetchMovies({ query: newQuery });
      setMovies(results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && !loading && !error && (
        <>
          <p style={{ padding: "8px 0" }}>
            Showing results for: <strong>{query}</strong>
          </p>
          <MovieGrid movies={movies} onSelect={handleSelect} />
        </>
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleClose} />
      )}
    </>
  );
}
