const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `eba0388c934688725105b53c98cf82ca`;

const VIDEO_BY_SEARCH = `${BASE_URL}/search/movie?api_key=${API_KEY}&include_adult=false`;

export default class MovieApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.language = 'ru-US';
    this.genres = '';
  }

  // ======== поиск фильмов ======== //
  fetchMoviesBySearch() {
    return fetch(
      `${VIDEO_BY_SEARCH}&query=${this.searchQuery}&language=${this.language}&page=${this.page}`,
    ).then(response => response.json());
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
