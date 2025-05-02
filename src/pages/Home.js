import { useState } from 'react';
import SearchBar from '../components/SearchBar.js';
import MovieCard from '../components/MovieCard.js';
import { searchMovies } from '../services/api.js';
import { useLocalStorage } from '../Hooks/useLocalStorage.js';
import styles from './Home.module.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      setError(error.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (movie) => {
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Movie Browser</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onFavoriteToggle={handleFavoriteToggle}
            isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
}