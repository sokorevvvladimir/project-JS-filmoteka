'use strict';

import movieModal from '../templates/film-description-modal.hbs';
import MovieApiService from '../api/fetch-api';
import { getImgPath } from '../utils/normalizationObj';

const modalDialog = document.querySelector('.modal-one-film');
const modalContent = document.querySelector('.modal-one-film__content');
const closeButton = document.querySelector('.modal-close-btn');

// Eugen-Ko----
import {signIn} from '../components/autorization';
// ------------

closeButton.addEventListener('click', () => {
  modalDialog.classList.toggle('modal-one-film--hidden');
});

const movieApiService = new MovieApiService();

document.querySelector('.films__container').addEventListener('click', event => {
  event.preventDefault(); // чтобы не скролил вверх до начала контейнера
  for (let el of event.path) {
    // идем наверх по иерархии элементов, так как может быть, что кликнули на внутренний span
    if (el.classList?.contains('movies__item')) {
      // если среди классов есть карточка фильма, показываем модалку
      const link = el.querySelector('.movies__link');
      const id = link.dataset.id;
      movieApiService.getMovieId(id);

      movieApiService.getMovieDetails(id).then(res => {
        // normalizationMovieObj(res) не подходит, из АПИ прилетает другая структура:
        // - жанры сразу с названиями
        // - два названия фильма (переведённое и оригинальное)

        const data = {
          // ставим данные в модалку
          ...res,
          genre: res.genres.map(g => g.name).join(', '),
          img: getImgPath(res.poster_path),
        };

        modalContent.innerHTML = movieModal(data);

        // Eugen-Ko-----------
        // Прячем кнопки добавления, если без регистрации
        if (!signIn) document.querySelector('.modal-buttons').style.visibility = 'hidden';
        // -------------

        modalDialog.classList.toggle('modal-one-film--hidden');

        // при появлении модалки появляются кнопки, получаю ссылки на них ниже//

        const refs = {
          watchedBtn: document.querySelector('.add-to-watched'),
          queueBtn: document.querySelector('.add-to-queue'),
        };

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
            console.log(item.id);
            console.log(id);
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

          if (movie.success === false) {
            return;
          }

          if (e.target.dataset.watch) {
            if (e.target.dataset.add) {
              switchWatchAddAttr();
              return movieApiService.addMovie(movie, e.target.dataset.watch);
            }
            if (e.target.dataset.remove) {
              switchWatchRemoveAttr();
              return movieApiService.deleteMovie(e.target.dataset.watch);
            }
          }

          if (e.target.dataset.queue) {
            if (e.target.dataset.add) {
              switchQueueAddAttr();
              return movieApiService.addMovie(movie, e.target.dataset.queue);
            }
            switchQueueRemoveAttr();
            return movieApiService.deleteMovie(e.target.dataset.queue);
          }
        };
        refs.watchedBtn.addEventListener('click', onBtnClickHandle);

        refs.queueBtn.addEventListener('click', onBtnClickHandle);
      });

      return;
    }
  }
});
