import { refs } from '../utils/refs';

const placeholderSetter = () => {
  refs.filmsList.innerHTML = `<div class="div-placeholder">
  Nothing here so far
  </div>`;
};

export { placeholderSetter };
