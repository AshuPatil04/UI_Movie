import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie, onFavoriteToggle, isFavorite }) {
  return (
    <div className={styles.movieCard}>
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
        alt={movie.Title}
      />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <Link to={`/movie/${movie.imdbID}`}>
        <button>More Info</button>
      </Link>
      <button
        className={isFavorite ? styles.removeFavoriteBtn : styles.favoriteBtn}
        onClick={() => onFavoriteToggle(movie)}
      >
        {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
      </button>
    </div>
  );
}