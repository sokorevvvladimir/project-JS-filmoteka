"use strict";

const modalDialog = document.querySelector(".modal-one-film");
const closeButton = document.querySelector(".modal-close-btn");

closeButton.addEventListener('click', () => {
    modalDialog.classList.toggle('modal-one-film--hidden')
});

document.querySelector('.films__container').addEventListener('click', (event) => {
    for (let el of event.path) {
        // идем наверх по иерархии элементов, так как может быть, что кликнули на внутренний span
        if ( el.classList?.contains('films__card')) { 
            // если среди классов есть карточка фильма, показываем модалку 
            modalDialog.classList.toggle('modal-one-film--hidden');
            return;
        }
    }
});
