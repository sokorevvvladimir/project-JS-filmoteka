import MovieApiService from '../api/fetch-api.js';
import { refs } from '../utils/refs.js';

const movieApiService = new MovieApiService();

refs.filmsList.addEventListener('click', onTrailerBtnClick);

async function onTrailerBtnClick(event) {
  const item = event.target.closest('.trailer-button');

  if (!item) return;

  const cardContainer = event.target.closest('.movies__card');
  const link = cardContainer.querySelector('.movies__link');
  const id = link.dataset.id;

  const trailerId = getTrailer(id);

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
  refs.trailerBackdrop.classList.remove('trailer__backdrop--hidden');
  refs.html.classList.add('disable-scroll');
}

function closeModal() {
  document.removeEventListener('keydown', closeOnEsc);
  refs.trailerBackdrop.classList.add('trailer__backdrop--hidden');
  refs.html.classList.remove('disable-scroll');
}

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

export async function getTrailer(id) {
  const response = await movieApiService.fetchTrailer(id);
  const videoId = response.results[0].key;
  return videoId;
}

function createPlayer(id) {
  const playerContainer = document.getElementById('player');
  let player;
  onYouTubeIframeAPIReady(id);
  player;

  function onYouTubeIframeAPIReady(id) {
    player = new YT.Player(playerContainer, {
      height: '200',
      width: '100%',
      videoId: id,
      host: 'http://www.youtube.com',
      playerVars: {
        enablejsapi: 1,
        autoplay: 0,
        frameborder: 0,
        origin: 'http://example.com',
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  function onPlayerReady(event) {
    player.loadVideoById(id);
    stopVideo();
  }

  function onPlayerStateChange(event) {
    //Body
  }

  function stopVideo() {
    player.stopVideo();
  }
}
