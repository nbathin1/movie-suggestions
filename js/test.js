const apiKey = '57651ca41ca771f92a7a396373f5857b';

// Function to fetch the latest movie details
async function getLatestMovie() {
  const response = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${apiKey}`);
  const data = await response.json();
  return data.release_date.split('-')[0]; // Extract the year from the release date
}

// Function to fetch the latest TV show details
async function getLatestTVShow() {
  const response = await fetch(`https://api.themoviedb.org/3/tv/latest?api_key=${apiKey}`);
  const data = await response.json();
  return data.first_air_date.split('-')[0]; // Extract the year from the first air date
}

// Main function to get the latest year for which data is available
async function getLatestYear() {
  const latestMovieYear = await getLatestMovie();
  const latestTVShowYear = await getLatestTVShow();
  return Math.max(latestMovieYear, latestTVShowYear);
}

// Usage
getLatestYear()
  .then(year => console.log(`The latest year for which data is available is ${year}`))
  .catch(error => console.error('Error:', error));
