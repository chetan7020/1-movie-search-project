import { FAV_KEY_PREFIX } from "./config/config.js";

function getFavKey(imdbID) {
    return `${FAV_KEY_PREFIX}${imdbID}`;
}

export function saveMovie(imdbID, movie) {
    localStorage.setItem(getFavKey(imdbID), JSON.stringify(movie));
}

export function removeMovie(imdbID) {
    localStorage.removeItem(getFavKey(imdbID));
}

export function isMovieFavorite(imdbID) {
    return localStorage.getItem(getFavKey(imdbID)) !== null;
}

export function getAllFavorites() {
    const movies = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(FAV_KEY_PREFIX)) {
            movies.push(JSON.parse(localStorage.getItem(key)));
        }
    }
    return movies;
}