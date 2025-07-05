import axios from "axios";
import { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesParams {
  query: string;
  page?: number;
}

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<Movie[]> {
  try {
    const response = await axios.get<TMDBResponse>(`${BASE_URL}/search/movie`, {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}
