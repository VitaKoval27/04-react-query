import axios from 'axios';
import type { Movie} from '../types/movie';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface PaginatedMovies {
  results: Movie[];
  total_pages: number;
}

interface TmdbMovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (topic: string, page: number = 1): Promise<PaginatedMovies> => {
  if (!TMDB_TOKEN) {
    throw new Error('TMDB token is not set in VITE_TMDB_TOKEN environment variable.');
  }

  const config = {
    params: {
      query: topic,
      page: page,
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };

  try {
    const response = await axios.get<TmdbMovieResponse>(
      'https://api.themoviedb.org/3/search/movie',
      config
    );

    return {
      results: response.data.results,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching movies:', error.message);
      throw new Error('Failed to fetch movies from the API.');
    } else {
      console.error('An unexpected error occurred:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};
