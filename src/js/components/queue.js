import { renderMoviesList } from './createMoviesList.js';
import { refs } from '../utils/refs.js';




refs.queueBtn.addEventListener('click', onQueue);


function onQueue() {




    //получаем данные localStorage
    const saveData = localStorage.getItem('queue');
    // парсим в JSON
    const parseData = JSON.parse(saveData);

    if (parseData) {

        refs.filmsList.innerHTML = '';
        renderMoviesList(parseData);
    }
}