'use strict';

import movieModal from '../templates/film-description-modal.hbs';
import MovieApiService from '../api/fetch-api';
import { getImgPath } from '../utils/normalizationObj';

const modalDialog = document.querySelector('.modal-one-film');
const modalContent = document.querySelector('.modal-one-film__content');
const closeButton = document.querySelector('.modal-close-btn');

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
            const link = el.querySelector('.movies__link')
            const id = link.dataset.id;

            movieApiService.getMovieDetails(id).then(res => {
                // normalizationMovieObj(res) не подходит, из АПИ прилетает другая структура:
                // - жанры сразу с названиями
                // - два названия фильма (переведённое и оригинальное)

                const data = {// ставим данные в модалку
                    ...res,
                    genre: res.genres.map(g => g.name).join(', '),
                    img: getImgPath(res.poster_path)
                };

                modalContent.innerHTML = movieModal(data);
                modalDialog.classList.toggle('modal-one-film--hidden');
            });

            return;
        }
    }
});

