import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Pagination from '../Pagination/Pagination';
import { fetchMovies } from '../../services/movieService';
import type { Movie, PaginatedMovies } from '../../types/movie';
import { Toaster } from 'react-hot-toast';

function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<PaginatedMovies, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setSelectedMovie(null);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage + 1);
  };

  const handleErrorClose = () => {
    setQuery('');
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      
      {isLoading && <Loader />}
      
      {isError && error && (
        <ErrorMessage message={error.message} onClose={handleErrorClose} />
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
      
      {data && data.results && data.results.length === 0 && query && !isLoading && !isError && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          No movies found for your query.
        </p>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      
      {!import.meta.env.PROD && <ReactQueryDevtools initialIsOpen={false} />}
    </>
  );
}

export default App;
