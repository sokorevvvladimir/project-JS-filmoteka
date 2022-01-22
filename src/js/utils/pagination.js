import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { renderMoviesList } from '../components/createMoviesList.js';

import { refs } from './refs.js';

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
    moveButton: ({ type }) => {
      let template = '';
      const firstPage = 1;
      const lastPage = options.totalItems / options.itemsPerPage;
      switch (type) {
        case 'first':
          template =
            `<a href="#" class="tui-page-btn tui-${type}">` +
            `<span class="tui-ico-${type}">${firstPage}</span>` +
            `</a>`;
          break;
        case 'last':
          template =
            `<a href="#" class="tui-page-btn tui-${type}">` +
            `<span class="tui-ico-${type}">${lastPage}</span>` +
            `</a>`;
          break;
        case 'next':
          template =
            `<a href="#" class="tui-page-btn tui-${type}">` +
            `<span class="tui-ico-${type}">
                <svg class="tui-pagination-svg" width="16" height="16">
                  <use href="/sprite.5ec50489.svg#arrow-right"></use>
                </svg>
              </span>` +
            `</a>`;
          break;
        case 'prev':
          template =
            `<a href="#" class="tui-page-btn tui-${type}">` +
            `<span class="tui-ico-${type}">
              <svg class="tui-pagination-svg" width="16" height="16">
                <use href="/sprite.5ec50489.svg#arrow-left"></use>
              </svg>
            </span>` +
            `</a>`;
          break;
        default:
          break;
      }

      return template;
    },
    disabledMoveButton: ({ type }) => {
      let template = '';
      const firstPage = 1;
      const lastPage = options.totalItems / options.itemsPerPage;

      switch (type) {
        case 'first':
          template =
            `<a href = "#" class="tui-page-btn tui-is-disabled tui-${type}">` +
            `<span class="tui-ico-${type}">${firstPage}</span>` +
            `</a>`;
          break;
        case 'last':
          template =
            `<a href="#" class="tui-page-btn tui-is-disabled tui-${type}">` +
            `<span class="tui-ico-${type}">${lastPage}</span>` +
            `</a>`;
          break;
        case 'next':
          template =
            `<a href="#" class="tui-page-btn tui-is-disabled tui-${type}">` +
            `<span class="tui-ico-${type}">
                <svg class="tui-pagination-svg" width="16" height="16">
                  <use href="/sprite.5ec50489.svg#arrow-right"></use>
                </svg>
              </span>` +
            `</a>`;
          break;
        case 'prev':
          template =
            `<a href="#" class="tui-page-btn tui-is-disabled tui-${type}">` +
            `<span class="tui-ico-${type}">
              <svg class="tui-pagination-svg" width="16" height="16">
                <use href="/sprite.5ec50489.svg#arrow-left"></use>
              </svg>
            </span>` +
            `</a>`;
          break;

        default:
          break;
      }

      return template;
    },
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const paginationPopular = new Pagination('#tui-pagination-container', options);

const page = paginationPopular.getCurrentPage();

fetchPopularVideo(page).then(({ video, total }) => {
  paginationPopular.reset(total);
  renderPopularVideo(video);
});

function fetchPopularVideo(page) {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=eba0388c934688725105b53c98cf82ca&page=${page}`,
  )
    .then(res => res.json())
    .then(data => ({ video: data.results, total_results: data.total_results }));
}

function renderPopularVideo(video) {
  refs.filmsList.innerHTML = '';
  renderMoviesList(video);
}

const popularVideo = event => {
  fetchPopularVideo(event.page).then(({ video }) => {
    renderPopularVideo(video);
  });
};

paginationPopular.on('afterMove', event => {
  popularVideo(event);

  const currentPage = event.page;
  const firstPage = document.querySelector('.tui-page-btn.tui-first');
  const lastPage = document.querySelector('.tui-page-btn.tui-last');
  const lastPageNum = options.totalItems / options.itemsPerPage;

  if (currentPage === 1 || currentPage === 2 || currentPage === 3) {
    firstPage.classList.add('tui-is-disabled');
  } else {
    firstPage.classList.remove('tui-is-disabled');
  }

  if (
    currentPage === lastPageNum - 2 ||
    currentPage === lastPageNum - 1 ||
    currentPage === lastPageNum
  ) {
    lastPage.classList.add('tui-is-disabled');
  } else {
    lastPage.classList.remove('tui-is-disabled');
  }
});
