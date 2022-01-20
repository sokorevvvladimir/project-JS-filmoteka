'use strict';

import movieModal from '../templates/film-description-modal.hbs';
import MovieApiService from '../api/fetch-api';
import { getImgPath } from '../utils/normalizationObj';

const modalDialog = document.querySelector('.modal-one-film');
const html = document.querySelector('html');
const modalContent = document.querySelector('.modal-one-film__content');
const closeButton = document.querySelector('.modal-close-btn');

const closeOnEsc = (e) => {
    console.log('keydown', e.key)
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


const movieApiService = new MovieApiService();

document.querySelector('.films__container').addEventListener('click', event => {
    event.preventDefault(); // чтобы не скролил вверх до начала контейнера

    const item = event.target.closest('.movies__item');
    if (item) {
        // если среди классов есть карточка фильма, показываем модалку
        const link = item.querySelector('.movies__link')
        const id = link.dataset.id;

        movieApiService.getMovieDetails(id)
            .then(res => {
                // ставим данные в модалку
                const data = {
                    ...res,
                    genre: res.genres.map(g => g.name).join(', '),
                    img: getImgPath(res.poster_path)
                };
                modalContent.innerHTML = movieModal(data);
                openModal();
            });
    }
});


