const API_KEY = '41d1a345'; // Use your actual key
export const searchMovies = async (query) => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Response === 'False') {
      throw new Error(data.Error || 'No results found');
    }
    return data.Search || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie not found');
    }
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};