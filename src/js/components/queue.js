import { renderMoviesList } from './createMoviesList.js';
import { refs } from '../utils/refs.js';
refs.queueBtn.addEventListener('click', onQueue);
<<<<<<< Updated upstream
hideQueue();
=======
>>>>>>> Stashed changes
refs.watchedBtn.addEventListener('click', onWatched);

function onQueue() {
    showQueue();
    hideQueue();
    //получаем данные localStorage
    const saveData = localStorage.getItem('queue');
    // парсим в JSON
    const parseData = JSON.parse(saveData);

    if (parseData) {
        refs.filmsList.innerHTML = '';
        renderMoviesList(parseData);
    }
}

function onWatched() {
    refs.watchedBtn.classList.add('is-active');
    refs.queueBtn.classList.remove('is-active');
}

function showQueue() {
    refs.queueBtn.classList.add('is-active');
}

function hideQueue() {
    refs.watchedBtn.classList.remove('is-active');
}