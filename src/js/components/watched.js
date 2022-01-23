import { loadFromLocalStorage } from '../utils/utils';
import { refs } from '../utils/refs';
import { placeholderSetter } from './films-container';
import MoviePagination from '../utils/pagination';
import { spinner } from '../utils/spinner';

const watchedBtn = document.querySelector('.js-library-watched');
const PER_PAGE = 9;

function markupAdapter(itemListFromLocalStorage) {
  return itemListFromLocalStorage.map(
    ({ id, genres, poster_path, original_title, release_date, vote_average }) => ({
      id,
      genre_ids: genres.map(genre => genre.id),
      poster_path,
      original_title,
      release_date,
      vote_average,
    }),
  );
}

export function markup(items) {
  if (!items) {
    refs.pagination.innerHTML = '';
    return;
  }

  if (items.length === 0) {
    refs.pagination.innerHTML = '';
    placeholderSetter();
    return;
  }

  const totalItems = items.length;
  refs.filmsList.innerHTML = '';

  new MoviePagination('watched', PER_PAGE, totalItems);
  spinner.off();
}

watchedBtn.addEventListener('click', () => markup(loadFromLocalStorage('watched')));
