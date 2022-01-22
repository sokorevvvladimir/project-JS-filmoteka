import { loadFromLocalStorage } from '../utils/utils';
import { renderMoviesList } from '../utils/createMoviesList';
import { refs } from '../utils/refs';
import { placeholderSetter } from './films-container';

const watchedBtn = document.querySelector('.js-library-watched');

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

function markup(items) {
  if (!items) {
    return;
  }

  if (items.length === 0) {
    placeholderSetter();
    return;
  }
  refs.filmsList.innerHTML = '';
  renderMoviesList(markupAdapter(items));
}

watchedBtn.addEventListener('click', () => markup(loadFromLocalStorage('watched')));