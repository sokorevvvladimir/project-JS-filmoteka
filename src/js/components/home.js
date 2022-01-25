import imgDefault from '../../images/503.jfif';
import MoviePagination from '../utils/pagination';
import MovieApiService from '../api/fetch-api.js';
import Notiflix from 'notiflix';
import { refs } from '../utils/refs.js';
import { spinner } from '../utils/spinner';
import { onTrailerBtnClick } from './trailer';

const PER_PAGE = 20;
const movieApiService = new MovieApiService();
Notiflix.Notify.init({ position: 'center-top' });

renderPopularMovies();

export async function renderPopularMovies() {
  try {
    spinner.on();
    const response = await movieApiService.fetchPopular();
    spinner.off();

    if (!response?.results) {
      throw new Error(error);
    }

    const { total_results: totalItems } = response;

    new MoviePagination('popular', PER_PAGE, totalItems);
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, the server is temporarily unavailable. Please try again later.',
    );
    spinner.off();
    refs.filmsList.innerHTML = `<img src=${imgDefault} class="imageDefault"/>`;
  }
}
