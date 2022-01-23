import Notiflix from 'notiflix';
import MovieApiService from '../api/fetch-api.js';
import MoviePagination from '../utils/pagination';
import { refs } from '../utils/refs.js';
import { spinner } from '../utils/spinner';

const { search } = refs;
const PER_PAGE = 20;
const movieApiService = new MovieApiService();
Notiflix.Notify.init({ position: 'center-top' });

search.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  let searchQuery = e.target.elements.query.value.trim();
  search.reset();

  if (!searchQuery) {
    Notiflix.Notify.failure('Please enter search parameters.');
    return;
  }

  try {
    movieApiService.query = searchQuery;
    spinner.on();

    const response = await movieApiService.fetchMoviesBySearch();
    spinner.off();

    if (response?.results.length === 0) {
      throw new Error('Sorry, there are no video matching your search query. Please try again.');
    }

    const { total_results: totalItems } = response;

    new MoviePagination('by-search', PER_PAGE, totalItems, searchQuery);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    spinner.off();
    return;
  }
}
