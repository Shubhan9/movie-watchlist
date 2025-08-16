document.getElementById("search").addEventListener("click", function(event) {
    event.preventDefault();
    const searchInput = document.getElementById("search-input").value;

    fetch(`http://www.omdbapi.com/?apikey=df1d654f&s=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById("results-container");
            resultsContainer.innerHTML = "";

            if (data.Search) {
                data.Search.forEach(movie => {
                    const movieElement = document.createElement("div");
                    movieElement.className = "movie";
                    const Poster=(movie.Poster !== "N/A" && movie.Poster !="") ? movie.Poster : "placeholder.png"; // Fallback for missing posters
                    movieElement.innerHTML = `
                        <h3>${movie.Title}</h3>
                        <p>Year: ${movie.Year}</p>
                        <img src="${Poster}">
                        <button>Add to Watchlist</button>
                    `;

                    const addBtn = movieElement.querySelector("button");
                    addBtn.addEventListener("click", () => addToWatchlist(movie));

                    resultsContainer.appendChild(movieElement);
                });
            } else {
                resultsContainer.innerHTML = `<p>No results found for "${searchInput}"</p>`;
            }
        });
});

function addToWatchlist(movie) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    // avoid duplicates
    if (!watchlist.some(m => m.imdbID === movie.imdbID)) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert(`${movie.Title} added to your watchlist!`);
    }
}
