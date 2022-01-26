import MoviePagination from '../utils/pagination';
import Notiflix from 'notiflix';

const PER_PAGE = 20;
const TOTAL_ITEMS_DEFAULT = 1980;
Notiflix.Notify.init({ position: 'center-top' });

renderPopularMovies();

export async function renderPopularMovies() {
  new MoviePagination('popular', PER_PAGE, TOTAL_ITEMS_DEFAULT);
}
