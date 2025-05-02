import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Home from './pages/Home.js';
import MovieDetails from './pages/MovieDetails.js';
import Favorites from './pages/Favorites.js';
import styles from './App.module.css';

export default function App() {
  return (
    <BrowserRouter>
      <header className={styles.appBar}>
        <h1 className={styles.title}>Movie Browser</h1>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            <HomeIcon fontSize="small" className={styles.icon} />
            Home
          </Link>
          <Link to="/favorites" className={styles.navLink}>
            <FavoriteIcon fontSize="small" className={styles.icon} />
            Favorites
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}