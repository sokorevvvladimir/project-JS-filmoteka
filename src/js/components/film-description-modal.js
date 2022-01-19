'use strict';

import movieModal from '../templates/film-description-modal.hbs';
import MovieApiService from '../api/fetch-api';
import { getImgPath } from '../utils/normalizationObj';

const modalDialog = document.querySelector('.modal-one-film');
const body = document.querySelector('.body');
const modalContent = document.querySelector('.modal-one-film__content');
const closeButton = document.querySelector('.modal-close-btn');

function toggleModal() {
    modalDialog.classList.toggle('modal-one-film--hidden');
    body.classList.toggle('blocked');
};

function openModal() {
    modalDialog.classList.remove('modal-one-film--hidden');
    body.classList.add('blocked');
}

function closeModal() {
    modalDialog.classList.add('modal-one-film--hidden');
    body.classList.remove('blocked');
}

closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
});

modalDialog.addEventListener('click', (e) => {
    if (e.target !== modalDialog) {
        return;
    }
    closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.keyCode !== 27) {
        return;
    }
    closeModal();
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

                const data = {// ставим данные в модалку
                    ...res,
                    genre: res.genres.map(g => g.name).join(', '),
                    img: getImgPath(res.poster_path)
                };
                modalContent.innerHTML = movieModal(data);
                openModal();
            });

            return;
        }
    }
});


