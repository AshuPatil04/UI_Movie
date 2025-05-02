import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard.js';
import { useLocalStorage } from '../Hooks/useLocalStorage.js';
import styles from './Favorites.module.css';

export default function Favorites() {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const handleFavoriteToggle = (movie) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
  };

  return (
    <div className={styles.container}>
      <h1>Favorites</h1>
      <div className={styles.favorites}>
        {favorites.length === 0 ? (
          <p>No favorites added.</p>
        ) : (
          <div className={styles.movieGrid}>
            {favorites.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
      <Link to="/">Back to Search</Link>
    </div>
  );
}