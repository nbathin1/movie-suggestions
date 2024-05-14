document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '57651ca41ca771f92a7a396373f5857b';
    const currentYear = new Date().getFullYear();
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${currentYear}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Initial movie search data:", data); // Log initial search results
            const listDiv = document.getElementById('topPicksList');
            if (!listDiv) {
                console.error("Error: The container element for displaying movies is not found.");
                return;
            }

            if (data.results && data.results.length > 0) {
                data.results.forEach(movie => {
                    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`)
                        .then(response => response.json())
                        .then(details => {
                            console.log(`Details for ${details.title}:`, details); // Log each movie's detailed data
                            if (details.production_countries && (details.production_countries.some(country => country.iso_3166_1 === "US") || details.production_countries.some(country => country.iso_3166_1 === "IN"))) {
                                listDiv.innerHTML += `
                                    <div>
                                        <h3>${details.title} (${details.release_date.slice(0, 4)})</h3>
                                        <img src="https://image.tmdb.org/t/p/w500${details.poster_path}" alt="Poster for ${details.title}">
                                        <p>${details.overview}</p>
                                        <p><strong>Director:</strong> ${details.production_companies.map(company => company.name).join(', ')}</p>
                                        
                                    </div>
                                `;
                            } else {
                                console.log(`${details.title} not shown, released in ${details.production_countries.map(country => country.name).join(', ')}`);
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
