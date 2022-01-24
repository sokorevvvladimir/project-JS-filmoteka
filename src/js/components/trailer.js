import YouTubePlayer from 'youtube-player';
import MovieApiService from '../api/fetch-api.js';
import { refs } from '../utils/refs.js';

const movieApiService = new MovieApiService();

let player = null;

refs.filmsList.addEventListener('click', onTrailerBtnClick);

async function onTrailerBtnClick(event) {
  const item = event.target.closest('.trailer-button');

  if (!item) return;

  const cardContainer = event.target.closest('.movies__card');
  const link = cardContainer.querySelector('.movies__link');
  const id = link.dataset.id;

  const trailerId = await getTrailer(id);

  createPlayer(trailerId);

  openModal();
}

const closeOnEsc = e => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeModal();
  }
};

function openModal() {
  document.addEventListener('keydown', closeOnEsc);
  refs.closeButton.addEventListener('click', e => {
    e.preventDefault();
    closeModal();
  });

  refs.trailerBackdrop.addEventListener('click', e => {
    if (e.target !== refs.trailerBackdrop) {
      return;
    }
    closeModal();
  });
  refs.trailerBackdrop.classList.remove('trailer__backdrop--hidden');
  refs.html.classList.add('disable-scroll');
}

function closeModal() {
  console.log(player);
  player?.stopVideo();
  player = null;
  document.removeEventListener('keydown', closeOnEsc);
  refs.trailerBackdrop.classList.add('trailer__backdrop--hidden');
  refs.html.classList.remove('disable-scroll');
}

async function getTrailer(id) {
  const response = await movieApiService.fetchTrailer(id);
  const videoId = response.results[0].key;
  return videoId;
}

function createPlayer(id) {
  const playerContainer = document.getElementById('player');

  player = YouTubePlayer(playerContainer, {
    videoId: id,
  });

  player.playVideo();

  return player;
}
