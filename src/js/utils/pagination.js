import Pagination from 'tui-pagination';
import Notiflix from 'notiflix';
import 'tui-pagination/dist/tui-pagination.css';
import MovieApiService from '../api/fetch-api.js';
import { renderMoviesList } from './create-movies-list.js';
import { refs } from './refs.js';
import { startSmoothScroll } from './utils.js';
import { spinner } from '../utils/spinner';
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
      page: '<a href="#" aria-label="page" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong aria-label="page" class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton: ({ type }) => {
        let template = '';
        const firstPage = 1;
        const lastPage = Math.ceil(this.options.totalItems / this.options.itemsPerPage);
        const hiddenClass = lastPage < 6 ? 'visually-hidden' : '';
        switch (type) {
          case 'first':
            template =
              `<a href="#" aria-label="first"class="tui-page-btn tui-${type} visually-hidden">` +
              `<span class="tui-ico-${type}">${firstPage}</span>` +
              `</a>`;
            break;
          case 'last':
            template =
              `<a href="#" aria-label="last" class="tui-page-btn tui-${type} ${hiddenClass}">` +
              `<span class="tui-ico-${type}">${lastPage}</span>` +
              `</a>`;
            break;
          case 'next':
            template =
              `<a href="#" aria-label="next" class="tui-page-btn tui-${type} ${hiddenClass}">` +
              `<span class="tui-ico-${type}"></span>` +
              `</a>`;
            break;
          case 'prev':
            template =
              `<a href="#" aria-label="prev" class="tui-page-btn tui-${type} visually-hidden">` +
              `<span class="tui-ico-${type}"></span>` +
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
        const lastPage = Math.ceil(this.options.totalItems / this.options.itemsPerPage);
        const hiddenClass = lastPage < 6 ? 'visually-hidden' : '';
        switch (type) {
          case 'first':
            template =
              `<a href = "#" aria-label="first" class="tui-page-btn tui-is-disabled tui-${type} visually-hidden">` +
              `<span class="tui-ico-${type}">${firstPage}</span>` +
              `</a>`;
            break;
          case 'last':
            template =
              `<a href="#" aria-label="last" class="tui-page-btn tui-is-disabled tui-${type} ${hiddenClass}">` +
              `<span class="tui-ico-${type}">${lastPage}</span>` +
              `</a>`;
            break;
          case 'next':
            template =
              `<a href="#" aria-label="next" class="tui-page-btn tui-is-disabled tui-${type} ${hiddenClass}">` +
              `<span class="tui-ico-${type}"></span>` +
              `</a>`;
            break;
          case 'prev':
            template =
              `<a href="#" aria-label="prev" class="tui-page-btn tui-is-disabled tui-${type} visually-hidden">` +
              `<span class="tui-ico-${type}"></span>` +
              `</a>`;
            break;

          default:
            break;
        }

        return template;
      },
      moreButton:
        '<a href="#" aria-label="more" class="tui-page-btn tui-{{type}}-is-ellip">' +
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
    spinner.on();

    const result = await this.getMovies(page);

    if (!result) {
      spinner.off();
      return;
    }

    if (this.type === 'watched' || this.type === 'queue') {
      const arrPerFirstPage = result.slice(0, 9);
      renderMoviesList(arrPerFirstPage);
      this.#pagination.on('afterMove', this.onPagination.bind(this));
      return;
    }

    const { results: movies } = result;

    this.#pagination.reset(this.options.totalItems);

    refs.filmsList.innerHTML = '';
    spinner.off();

    renderMoviesList(movies);

    this.#pagination.on('afterMove', this.onPagination.bind(this));
  }

  async onPagination(event) {
    this.paginationSettings(event);
    spinner.on();
    const result = await this.getMovies(event.page);

    if (!result) {
      spinner.off();
      return;
    }

    if (this.type === 'watched' || this.type === 'queue') {
      const startItem = (event.page - 1) * 9;
      const arrPerPage = result.slice(startItem, startItem + 9);

      startSmoothScroll();
      refs.filmsList.innerHTML = '';
      spinner.off();

      renderMoviesList(arrPerPage);
      return;
    }

    const { results: movies } = result;
    startSmoothScroll();
    refs.filmsList.innerHTML = '';
    spinner.off();
    renderMoviesList(movies);
  }

  async getMovies(page) {
    this.movieApiService.page = page;

    let response = null;

    switch (this.type) {
      case 'popular':
        try {
          spinner.on();
          response = await this.movieApiService.fetchPopular();
          spinner.off();

          if (!response?.results) {
            throw new Error(error);
          }

          const { total_results: totalItems } = response;
          this.options.totalItems = totalItems < 1980 ? totalItems : 1980;
        } catch (error) {
          Notiflix.Notify.failure(
            'Sorry, the server is temporarily unavailable. Please try again later.',
          );
          spinner.off();
          refs.pagination.innerHTML = '';
        }
        break;

      case 'by-search':
        this.movieApiService.searchQuery = this.searchQuery;
        response = await this.movieApiService.fetchMoviesBySearch();
        break;

      case 'watched':
        response = JSON.parse(this.movieApiService.getItemFromLS(`watched`));
        break;

      case 'queue':
        response = JSON.parse(this.movieApiService.getItemFromLS(`queue`));
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
    const nextPage = document.querySelector('.tui-page-btn.tui-next');
    const prevPage = document.querySelector('.tui-page-btn.tui-prev');
    const lastPageNum = Math.ceil(this.options.totalItems / this.options.itemsPerPage);

    if (lastPageNum < 6) {
      return;
    }

    if (currentPage === 1 || currentPage === 2 || currentPage === 3) {
      firstPage.classList.add('visually-hidden');
      prevPage.classList.add('visually-hidden');
    } else {
      firstPage.classList.remove('visually-hidden');
      prevPage.classList.remove('visually-hidden');
    }

    if (
      currentPage === lastPageNum - 2 ||
      currentPage === lastPageNum - 1 ||
      currentPage === lastPageNum
    ) {
      lastPage.classList.add('visually-hidden');
      nextPage.classList.add('visually-hidden');
    } else {
      lastPage.classList.remove('visually-hidden');
      nextPage.classList.remove('visually-hidden');
    }
  }
}
