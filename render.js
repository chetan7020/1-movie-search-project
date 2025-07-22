import { saveMovie, removeMovie, isMovieFavorite } from "./storage.js";

function createMovieCard(movie, onToggleFavorite) {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const isFav = isMovieFavorite(movie.imdbID);
    card.innerHTML = `
        <img src="${movie.Poster}">
        <h3>${movie.Title} (${movie.Year})</h3>
        <button class="fav-btn">
            ${isFav ? "Remove from Favorites" : "Add to Favorites"}
        </button>
    `;

    const btn = card.querySelector(".fav-btn");
    btn.addEventListener("click", () => {
        onToggleFavorite(movie, btn);
    });

    return card;
}

export function renderMovies(movies, containerId, onToggleFavorite) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (!movies.length) {
        container.innerHTML = "<h3>No Movies Found</h3>";
        return;
    }

    movies.forEach(movie => {
        const card = createMovieCard(movie, onToggleFavorite);
        container.appendChild(card);
    });
}