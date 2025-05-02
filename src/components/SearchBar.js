import { useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a movie title');
      return;
    }
    try {
      setError('');
      await onSearch(query);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setError(''); }}
          placeholder="Search for a movie..."
        />
      </form>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}