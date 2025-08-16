const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
const container = document.getElementById("watchlist-container");

container.innerHTML = ""; // clear default "empty" text

if (watchlist.length === 0) {
    container.innerHTML = "<p>Your watchlist is empty.</p>";
} else {
    watchlist.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.className = "watchlist-item";
        movieElement.innerHTML = `
            <h4>${movie.Title}</h4>
            <p>Year: ${movie.Year}</p>
            <img src="${movie.Poster}" alt="${movie.Title} poster">
            <button>Remove</button>
        `;

        movieElement.querySelector("button").addEventListener("click", () => {
            removeFromWatchlist(movie.imdbID);
            movieElement.remove();
        });

        container.prepend(movieElement);
    });
}

function removeFromWatchlist(id) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist = watchlist.filter(movie => movie.imdbID !== id);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}
