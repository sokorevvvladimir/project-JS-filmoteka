const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `eba0388c934688725105b53c98cf82ca`;

const VIDEO_BY_SEARCH = `${BASE_URL}/search/movie?api_key=${API_KEY}&include_adult=false`;

export default class MovieApiService {
  constructor() {
    this.searchQuery = '';
    this.currentPage = 1;
    this.language = 'ru-US';
    this.genres = '';
    this.movieId = 0;
  }

  // ======== поиск фильмов ======== //
  fetchMoviesBySearch() {
    return fetch(
      `${VIDEO_BY_SEARCH}&query=${this.searchQuery}&language=${this.language}&page=${this.page}`,
    ).then(response => response.json());
  }

  async fetchPopular() {
    const urlPopular = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${this.page}`;
    return fetch(urlPopular).then(response => response.json());
  }

  async getMovieDetails(id) {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
    return fetch(url).then(res => res.json());
  }

  async fetchById() {
    const response = await fetch(`${BASE_URL}/movie/${this.movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
  }

  async fetchTrailer(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
  }

  getMovieId(newId) {
    this.movieId = newId;
  }

  getItemFromLS(key) {
    return localStorage.getItem(key);
  }

  addMovie(movieObj, key) {
    let existingEntries = JSON.parse(this.getItemFromLS(key));
    if (existingEntries === null) existingEntries = [];

    existingEntries.push(movieObj);

    return localStorage.setItem(key, JSON.stringify(existingEntries));
  }

  deleteMovie(key) {
    let existingEntries = JSON.parse(this.getItemFromLS(key));

    const newEntries = existingEntries.filter(el => el.id !== Number(this.movieId));
    existingEntries = newEntries;

    return localStorage.setItem(key, JSON.stringify(existingEntries));
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

  get page() {
    return this.currentPage;
  }

  set page(page) {
    this.currentPage = page;
  }
}
