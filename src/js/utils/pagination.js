import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { renderMoviesList } from '../components/createMoviesList.js';
import { refs } from './refs.js';

const { search } = refs;

// import MovieApiService from '../api/fetch-api.js';
// const movieApiService = new MovieApiService();
// import { onSearch } from '../components/search-by-query.js';

// console.log(movieApiService)
const options = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const paginationPopular = new Pagination('#tui-pagination-container', options);
console.dir(paginationPopular);

const page = paginationPopular.getCurrentPage();

fetchPopularVideo(page)
  .then(({ video, total }) => {
    paginationPopular.reset(total);
    renderPopularVideo(video)
  });

function fetchPopularVideo(page) {
  return fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=eba0388c934688725105b53c98cf82ca&page=${page}`)
    .then(res => res.json())
    .then(data => ({ video: data.results, total_results: data.total_results }))
}

function renderPopularVideo(video) {
  refs.filmsList.innerHTML = '';
  renderMoviesList(video);
  console.log(video)
  console.log("render")
}
 const popularVideo = event => {
  fetchPopularVideo(event.page)
    .then(({ video }) => {
      renderPopularVideo(video)
    })
}
paginationPopular.on('afterMove', popularVideo);


// search.addEventListener('submit', event => {
//   event.preventDefault();

//   paginationPopular.off('afterMove', popularVideo);
//   paginationPopular.on('afterMove', videoBySearch);

//   const query = event.target.elements.query.value;
//   fetchMoviesBySearch(page, query).then(({ video}) => { renderVideoBySearch(video) });
// })

// =======================================================================================
const paginationBySearch = new Pagination('#tui-pagination-container', options);
console.dir(paginationBySearch);

const pageSearch = paginationBySearch.getCurrentPage();


search.addEventListener('submit', event => {
  event.preventDefault();
  paginationPopular.off('afterMove', popularVideo);
  paginationBySearch.on('afterMove', videoBySearch);
  // paginationBySearch.on('afterMove', popularVideo);

  const query = event.target.elements.query.value;
  fetchMoviesBySearch(pageSearch, query)
    .then(({ video, total }) => {
      paginationBySearch.reset(total);
      renderVideoBySearch(video)
    });
})

 
const videoBySearch = event => {
  fetchMoviesBySearch(event.page)
    .then(({ video }) => {
     renderVideoBySearch(video)
    })
  //  paginationBySearch.on('afterMove', videoBySearch);
}

function fetchMoviesBySearch(pageSearch, query) {
  return fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=eba0388c934688725105b53c98cf82ca&query=${query}&language=ru-US&page=${pageSearch}`)
    .then(res => res.json())
    .then(data => ({ video: data.results, total_results: data.total_results }))
}
 function renderVideoBySearch(video) {
  refs.filmsList.innerHTML = '';
  renderMoviesList(video);
  console.log(video)
  console.log("renderBySearch")
}
