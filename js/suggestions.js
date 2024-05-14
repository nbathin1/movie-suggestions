document.getElementById('suggestionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('suggestionInput').value;
    const apiKey = '57651ca41ca771f92a7a396373f5857b';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('suggestionResults');
            resultsDiv.innerHTML = ''; // Clear previous results
            if (data.results && data.results.length > 0) {
                const movie = data.results[0]; // Get the first movie from the results
                // Show suggestions based on genre
                resultsDiv.innerHTML += `<h3>More like '${movie.title}'</h3><div><h4>Genre: ${movie.genre_ids}</h4><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"><p>${movie.overview}</p></div>`;
                
                // Fetch additional movies of the same genre
                fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${movie.genre_ids[0]}`)
                    .then(response => response.json())
                    .then(genreData => {
                        if (genreData.results && genreData.results.length > 0) {
                            genreData.results.slice(1, 4).forEach(movie => {
                                resultsDiv.innerHTML += `<div><h3>${movie.title}</h3><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"><p>${movie.release_date}</p></div>`;
                            });
                        }
                    });
            } else {
                resultsDiv.innerHTML = '<p>No suggestions found.</p>';
            }
        })
        .catch(error => console.error('Error:', error));
});

