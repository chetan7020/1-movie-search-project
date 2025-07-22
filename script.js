import { BASE_URL, API_KEY } from "./config/config.js";
import { getAllFavorites, saveMovie, removeMovie, isMovieFavorite } from "./storage.js";
import { renderMovies } from "./render.js";

function handleToggleFavorite(movie, btn) {
    if (isMovieFavorite(movie.imdbID)) {
        removeMovie(movie.imdbID);
        btn.textContent = "Add to Favorites";
    } else {
        saveMovie(movie.imdbID, movie);
        btn.textContent = "Remove from Favorites";
    }

    renderFavorites();
}

function renderFavorites() {
    const favMovies = getAllFavorites();
    renderMovies(favMovies, "favorites", handleToggleFavorite);
}

async function searchMovies(query) {
    const url = new URL(BASE_URL);
    url.searchParams.set("apikey", API_KEY);
    url.searchParams.set("s", query);

    try {
        const res = await fetch(url);
        const data = await res.json();

        console.log(`data ${data}`)

        if (data.Response === "True") {
            renderMovies(data.Search, "movieResults", handleToggleFavorite);
        } else {
            renderMovies([], "movieResults", () => {});
        }

    } catch (err) {
        console.error("Search error:", err);
    }
}

// Initial render
renderFavorites();

// Bind event
document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();
    if (query) searchMovies(query);
});