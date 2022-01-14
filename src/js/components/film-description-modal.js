"use strict";

const modalDialog = document.querySelector(".modal-one-film");
const closeButton = document.querySelector(".modal-close-btn");

closeButton.addEventListener('click', () => {
    modalDialog.classList.toggle('modal-one-film--hidden')
});

document.querySelectorAll('.films__card').forEach(card => {
    card.addEventListener('click', () => {
        modalDialog.classList.toggle('modal-one-film--hidden')
    });
});