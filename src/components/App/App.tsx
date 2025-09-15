import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Pagination from '../Pagination/Pagination';
import { fetchMovies,type PaginatedMovies} from '../../services/movieService';
import type { Movie  } from '../../types/movie';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import styles from './App.module.css';

function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery<PaginatedMovies, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data && data.results && data.results.length === 0 && query) {
      toast.error('No movies found for your query.');
    }
  }, [isSuccess, data, query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setSelectedMovie(null);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage + 1);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <SearchBar onSearch={handleSearch} />
      
      {isLoading && <Loader />}
      
      {isError && error && (
        <ErrorMessage message={error.message} onClose={() => setQuery('')} />
      )}

      {data && data.results && data.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} onSelect={handleMovieSelect} />
          {data.total_pages > 1 && (
            <Pagination
              pageCount={data.total_pages}
              onPageChange={handlePageChange}
              forcePage={page - 1}
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      
      {!import.meta.env.PROD && <ReactQueryDevtools initialIsOpen={false} />}
    </div>
  );
}

export default App;
