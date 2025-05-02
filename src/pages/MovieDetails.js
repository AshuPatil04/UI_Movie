import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../services/api.js';
import { useLocalStorage } from '../Hooks/useLocalStorage.js';
import styles from './MovieDetails.module.css';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!movie) return;
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!movie) return <div className={styles.error}>Movie not found</div>;

  return (
    <div className={styles.container}>
      <div className={styles.movieDetails}>
        <h2>{movie.Title}</h2>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}
          alt={movie.Title}
        />
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>Ratings:</strong> {movie.imdbRating}/10</p>
        <button
          className={favorites.some((fav) => fav.imdbID === movie.imdbID) ? styles.removeFavoriteBtn : styles.favoriteBtn}
          onClick={handleFavoriteToggle}
        >
          {favorites.some((fav) => fav.imdbID === movie.imdbID) ? 'Remove Favorite' : 'Add to Favorites'}
        </button>
        <Link to="/">Back to Search</Link>
      </div>
    </div>
  );
}