import Notiflix from 'notiflix';
import MovieApiService from '../api/fetch-api.js';
import { refs } from '../utils/refs.js';

const movieApiService = new MovieApiService();
const spinnerModal = document.querySelector('.spinner-modal');

Notiflix.Notify.init({ position: 'center-top' });

refs.filmsList.addEventListener('click', onTrailerBtnClick);

refs.closeButton.addEventListener('click', e => {
  e.preventDefault();
  closeModal();
});

async function onTrailerBtnClick(event) {
  const item = event.target.closest('.trailer-button');

  if (!item) return;

  const cardContainer = event.target.closest('.movies__card');
  const link = cardContainer.querySelector('.movies__link');
  const id = link.dataset.id;
  try {
    const trailerId = await getTrailer(id);
    openModal(trailerId);
  } catch (error) {
    Notiflix.Notify.failure('Sorry, trailer not found 😢');
  }
}

export function openModal(id) {
  refs.trailerWindow.innerHTML = `<iframe
    id="player"
    width="640"
    height="360"
    src="https://www.youtube.com/embed/${id}?autoplay=1"
    frameborder="0"
    allow="autoplay"
    allowfullscreen
  ></iframe>`;

  const player = document.querySelector('#player');

  refs.trailerBackdrop.addEventListener('click', e => {
    if (e.target !== refs.trailerBackdrop) {
      return;
    }
    closeModal();
  });
  refs.trailerBackdrop.classList.remove('trailer__backdrop--hidden');

  spinnerModal.classList.toggle('is-hidden');

  refs.html.classList.add('disable-scroll');

  player.addEventListener('load', () => {
    spinnerModal.classList.toggle('is-hidden');
  });
}

function closeModal() {
  refs.trailerWindow.innerHTML = '';
  refs.trailerBackdrop.classList.add('trailer__backdrop--hidden');
  refs.html.classList.remove('disable-scroll');
}

export async function getTrailer(id) {
  const response = await movieApiService.fetchTrailer(id);
  const videoId = response.results[0].key;
  return videoId;
}
