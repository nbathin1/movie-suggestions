document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('searchInput').value.trim();
    if (!title) {
        console.log("No title entered"); // Check if the title is empty
        return;
    }

    const apiKey = '57651ca41ca771f92a7a396373f5857b'; // Your TMDb API key
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;

    console.log("Fetching data from:", apiUrl); // Log the URL to verify it's correct

    fetch(apiUrl)
        .then(response => {
            console.log("API response received"); // Check if the API responds
            return response.json();
        })
        .then(data => {
            console.log("Data parsed:", data); // Log the data to see what's received
            const resultsDiv = document.getElementById('searchResults');
            resultsDiv.innerHTML = ''; // Clear previous results

            if (data.results && data.results.length > 0) {
                const movies = data.results.slice(0, 5); // Get the top 5 movies from the results
                movies.forEach(movie => {
                    resultsDiv.innerHTML += `
                        <div>
                            <h2>${movie.title} (${movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'})</h2>
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Poster for ${movie.title}">
                            <p>${movie.overview}</p>
                        </div>
                    `;
                });
            } else {
                resultsDiv.innerHTML = '<p>Confused with the spelling? Try typing the movie name again.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            resultsDiv.innerHTML = 'An error occurred while fetching movie data.';
        });
});




