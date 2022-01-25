import { refs } from './refs.js';
import movieCard from '../templates/movieCard.hbs';
import { normalizationMovieObj } from './normalization-obj';

export function renderMoviesList(results) {
  const normalObjs = results.map(element => {
    let temp = normalizationMovieObj(element);

    temp.genre.length <= 3
      ? (temp.genre = temp.genre.join(', '))
      : (temp.genre = [temp.genre[0], temp.genre[1], 'Other'].join(', '));

    if (temp.title.length > 37) temp.title = temp.title.slice(0, 37) + '...';
    return temp;
  });

  refs.filmsList.insertAdjacentHTML('beforeend', movieCard(normalObjs));
}
