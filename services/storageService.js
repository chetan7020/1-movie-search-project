import {FAV_KEY_PREFIX} from "../config/config.js"

function getFavKey(imdbID) {
    return `${FAV_KEY_PREFIX}${imdbID}`;
}

export const StorageService = {

    save: function (key, value) {
        localStorage.setItem(getFavKey(key), JSON.stringify(value));
    },

    get: function (key) {
        return JSON.parse(localStorage.getItem(key));
    },

    remove: function (key) {
        localStorage.removeItem(getFavKey(key));
    },

    getAllFavorites: function () {
        return Object.keys(localStorage)
            .filter(key => key.startsWith("fav-movie-"))
            .map(key => StorageService.get(key));
    },

    isMovieFavorite: function (key) {
        return localStorage.getItem(getFavKey(key)) !== null;
    }
};