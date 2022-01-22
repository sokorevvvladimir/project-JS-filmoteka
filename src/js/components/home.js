import imgDefault from '../../images/503.jfif';
import MoviePagination from '../utils/pagination';
import MovieApiService from '../api/fetch-api.js';
import Notiflix from 'notiflix';
import { refs } from '../utils/refs.js';

const PER_PAGE = 20;
const movieApiService = new MovieApiService();

renderPopularMovies();

async function renderPopularMovies() {
  try {
    const response = await movieApiService.fetchPopular();

    if (!response?.results) {
      throw new Error(error);
    }

    const { total_results: totalItems } = response;

    new MoviePagination('popular', PER_PAGE, totalItems);
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, the server is temporarily unavailable. Please try again later.',
    );
    refs.filmsList.innerHTML = `<img src=${imgDefault} class="imageDefault"/>`;
  }
}
