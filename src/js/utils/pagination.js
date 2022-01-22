import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import MovieApiService from '../api/fetch-api.js';
import { renderMoviesList } from './createMoviesList.js';
import { refs } from './refs.js';

export default class MoviePagination {
  options = {
    totalItems: 1000,
    itemsPerPage: 0,
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
        const lastPage = Math.round(this.options.totalItems / this.options.itemsPerPage);
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
        const lastPage = Math.round(this.options.totalItems / this.options.itemsPerPage);

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

  #paginationEL = document.getElementById('tui-pagination-container');

  #pagination = null;

  constructor(type = 'popular', itemsPerPage = 20, totalItems = 1000, searchQuery = '') {
    this.type = type;
    this.searchQuery = searchQuery;
    this.options.totalItems = totalItems < 1980 ? totalItems : 1980;
    this.options.itemsPerPage = itemsPerPage;
    this.movieApiService = new MovieApiService();
    this.#pagination = new Pagination(this.#paginationEL, this.options);
    this.createPagination();
  }

  async createPagination() {
    const page = this.#pagination.getCurrentPage();
    const result = await this.getMovies(page);

    if (!result) return;

    const { results: movies } = result;

    this.#pagination.reset(this.options.totalItems);

    refs.filmsList.innerHTML = '';
    renderMoviesList(movies);

    this.#pagination.on('afterMove', this.onPagination.bind(this));
  }

  async onPagination(event) {
    this.paginationSettings(event);

    const result = await this.getMovies(event.page);

    if (!result) return;

    const { results: movies } = result;

    refs.filmsList.innerHTML = '';
    renderMoviesList(movies);
  }

  async getMovies(page) {
    this.movieApiService.page = page;

    let response = null;

    switch (this.type) {
      case 'popular':
        response = await this.movieApiService.fetchPopular();
        break;

      case 'by-search':
        this.movieApiService.searchQuery = this.searchQuery;
        response = await this.movieApiService.fetchMoviesBySearch();
        break;

      case 'watched':
        break;

      case 'queue':
        break;

      default:
        break;
    }

    return response;
  }

  paginationSettings(event) {
    const currentPage = event.page;
    const firstPage = document.querySelector('.tui-page-btn.tui-first');
    const lastPage = document.querySelector('.tui-page-btn.tui-last');
    const lastPageNum = Math.round(this.options.totalItems / this.options.itemsPerPage);

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
  }
}
