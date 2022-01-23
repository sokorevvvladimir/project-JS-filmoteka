'use strict';

import movieModal from '../templates/film-description-modal.hbs';
import MovieApiService from '../api/fetch-api';
import { getImgPath } from '../utils/normalizationObj';
import { refsFunction } from './local-store-btns-refs';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import { onQueue } from './queue';
import { markup as onWatched } from './watched';
import { loadFromLocalStorage } from '../utils/utils';

const modalDialog = document.querySelector('.modal-one-film');
const html = document.querySelector('html');
const modalContent = document.querySelector('.modal-one-film__content');
const closeButton = document.querySelector('.modal-close-btn');

// Eugen-Ko----
import { signIn } from '../components/autorization';
// ------------

Notiflix.Notify.init({ position: 'center-top' });

const closeOnEsc = e => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeModal();
  }
};

function openModal() {
  document.addEventListener('keydown', closeOnEsc);
  modalDialog.classList.remove('modal-one-film--hidden');
  html.classList.add('disable-scroll');
}

function closeModal() {
  document.removeEventListener('keydown', closeOnEsc);
  modalDialog.classList.add('modal-one-film--hidden');
  html.classList.remove('disable-scroll');
}

closeButton.addEventListener('click', e => {
  e.preventDefault();
  closeModal();
});

modalDialog.addEventListener('click', e => {
  if (e.target !== modalDialog) {
    return;
  }
  closeModal();
});

const movieApiService = new MovieApiService();

document.querySelector('.films__container').addEventListener('click', event => {
  event.preventDefault(); // чтобы не скролил вверх до начала контейнера

  const item = event.target.closest('.movies__item');

  if (item) {
    // если среди классов есть карточка фильма, показываем модалку
    const link = item.querySelector('.movies__link');
    const id = link.dataset.id;
    movieApiService.getMovieId(id);

    movieApiService.getMovieDetails(id).then(res => {
      // ставим данные в модалку
      const data = {
        ...res,
        genre: res.genres.map(g => g.name).join(', '),
        img: getImgPath(res.poster_path),
      };
      modalContent.innerHTML = movieModal(data);

      // Eugen-Ko-----------
      // Прячем кнопки добавления, если без регистрации
      if (!signIn) document.querySelector('.modal-buttons').style.visibility = 'hidden';
      // -------------

      openModal();

      // при появлении модалки появляются кнопки, получаю ссылки на них ниже//
      const refs = refsFunction();
      // ниже запуск двух функций на проверку локал сторедж на наличие фильма в свойстве просмотренные и в очереди //
      checkWatchedLS(id);
      checkQueueLS(id);

      //тело этих самых двух функций вызывающихся выше //

      function checkWatchedLS(id) {
        const LSwatchedItems = JSON.parse(movieApiService.getItemFromLS('watched'));

        if (LSwatchedItems === null) {
          return;
        }
        if (LSwatchedItems.length === 0) {
          return;
        }

        LSwatchedItems.map(item => {
          if (item.id === Number(id)) {
            switchWatchAddAttr();
            return;
          }
        });
      }

      function checkQueueLS(id) {
        const LSQueueItems = JSON.parse(movieApiService.getItemFromLS('queue'));
        if (LSQueueItems === null) {
          return;
        }
        if (LSQueueItems.length === 0) {
          return;
        }
        LSQueueItems.map(item => {
          if (item.id === Number(id)) {
            switchQueueAddAttr();
            return;
          }
        });
      }

      // ниже четыре функции замены дата-атрибутов кнопок после проверки на наличие фильмов в локал сторедж //

      function switchWatchAddAttr() {
        refs.watchedBtn.removeAttribute('data-add');
        refs.watchedBtn.setAttribute('data-remove', 'remove');
        refs.watchedBtn.classList.add('pressed');
        refs.watchedBtn.textContent = 'DELETE FROM WATCHED';
      }

      function switchWatchRemoveAttr() {
        refs.watchedBtn.removeAttribute('data-remove');
        refs.watchedBtn.setAttribute('data-add', 'add');
        refs.watchedBtn.textContent = 'ADD TO WATCHED';
        refs.watchedBtn.classList.remove('pressed');
      }

      function switchQueueAddAttr() {
        refs.queueBtn.removeAttribute('data-add');
        refs.queueBtn.setAttribute('data-remove', 'remove');
        refs.queueBtn.classList.add('pressed');
        refs.queueBtn.textContent = 'DELETE FROM QUEUE';
      }

      function switchQueueRemoveAttr() {
        refs.queueBtn.removeAttribute('data-remove');
        refs.queueBtn.setAttribute('data-add', 'add');
        refs.queueBtn.textContent = 'ADD TO QUEUE';
        refs.queueBtn.classList.remove('pressed');
      }

      // ниже основная функция по управлению кликом по двум кнопкам //

      const onBtnClickHandle = async e => {
        const movie = await movieApiService.fetchById().then(data => data);
        const watchedBtnHeader = document.querySelector('.js-library-watched');
        const queueBtnHeader = document.querySelector('.js-library-queue');

        if (movie.success === false) {
          Notiflix.Notify.failure('Sorry, an error occurred. Please try again.');
          return;
        }

        if (e.target.dataset.watch) {
          if (e.target.dataset.add) {
            switchWatchAddAttr();
            Notiflix.Notify.success(`Successfully added to the "Watched" list!`);
            movieApiService.addMovie(movie, e.target.dataset.watch);

            if (watchedBtnHeader.classList.contains('is-active')) {
              onWatched(loadFromLocalStorage('watched'));
            }

            return;
          }
          switchWatchRemoveAttr();
          Notiflix.Notify.info(`Removed from "Watched" list!`);
          movieApiService.deleteMovie(e.target.dataset.watch);

          if (watchedBtnHeader.classList.contains('is-active')) {
            onWatched(loadFromLocalStorage('watched'));
          }

          return;
        }

        if (e.target.dataset.queue) {
          if (e.target.dataset.add) {
            switchQueueAddAttr();
            Notiflix.Notify.success(`Successfully added to the "Queue" list!`);
            movieApiService.addMovie(movie, e.target.dataset.queue);

            if (queueBtnHeader.classList.contains('is-active')) {
              onQueue();
            }

            return;
          }
          switchQueueRemoveAttr();
          Notiflix.Notify.info(`Removed from "Queue" list!`);
          movieApiService.deleteMovie(e.target.dataset.queue);

          if (queueBtnHeader.classList.contains('is-active')) {
            onQueue();
          }

          return;
        }
      };
      refs.watchedBtn.addEventListener('click', onBtnClickHandle);

      refs.queueBtn.addEventListener('click', onBtnClickHandle);
    });
  }
});
