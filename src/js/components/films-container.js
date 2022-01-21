import { refs } from '../utils/refs';

import filmsListPlaceholder1x from '../../images/films-container-placeholder/container-placeholder-1x.jpg';
import filmsListPlaceholder2x from '../../images/films-container-placeholder/container-placeholder-2x.jpg';

const placeholderSetter = () => {
  refs.filmsList.innerHTML = `<img srcset="${filmsListPlaceholder1x} 1x, ${filmsListPlaceholder2x} 2x"
  src="${filmsListPlaceholder1x}"
  alt="placeholder" class="img-placeholder"/>`;
};

export { placeholderSetter };
