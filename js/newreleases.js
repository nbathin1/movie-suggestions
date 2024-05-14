document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '57651ca41ca771f92a7a396373f5857b';
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${lastWeek.toISOString().split('T')[0]}&primary_release_date.lte=${today.toISOString().split('T')[0]}`;

    console.log("Fetching movies from API:", apiUrl);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Initial movie search data:", data);
            const listDiv = document.getElementById('movieList');
            if (!listDiv) {
                console.error("Error: The container element for displaying movies is not found.");
                return;
            }

            if (data.results && data.results.length > 0) {
                listDiv.innerHTML = ''; // Clear existing content
                data.results.forEach(movie => {
                    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`)
                        .then(response => response.json())
                        .then(details => {
                            console.log(`Details for ${details.title}:`, details);
                            const releaseDate = new Date(details.release_date);
                            if ((details.production_countries.some(country => country.iso_3166_1 === "US") || details.production_countries.some(country => country.iso_3166_1 === "IN")) && releaseDate >= lastWeek && releaseDate <= today) {
                                const movieElement = document.createElement('div');
                                movieElement.innerHTML = `<h3>${details.title}</h3><img src="https://image.tmdb.org/t/p/w500${details.poster_path}" alt="Poster for ${details.title}"><p>Released: ${details.release_date} in ${details.production_countries.map(country => country.name).join(', ')}</p>`;
                                listDiv.appendChild(movieElement);
                                console.log(`Appended ${details.title} to the page.`);
                            }
                            
                        })
                        .catch(error => console.error('Error fetching movie details:', error));
                });
            } else {
                listDiv.innerHTML = 'No new releases found.';
            }
        })
        .catch(error => {
            console.error('Error fetching initial movie list:', error);
            listDiv.innerHTML = 'Failed to load new releases.';
        });
});
