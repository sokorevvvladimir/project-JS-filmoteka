import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

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
    moveButton: ({
      type
    }) => {
      let template = '';
      const firstPage = 1;
      const lastPage = options.totalItems / options.itemsPerPage;
      switch (type) {
        case 'first':
          template = `<a href="#" class="tui-page-btn tui-${type}">` +
            `<span class="tui-ico-${type}">${firstPage}</span>` + `</a>`;
          break;
        case 'last':
          template =`<a href="#" class="tui-page-btn tui-${type}">` +
            `<span class="tui-ico-${type}">${lastPage}</span>` + `</a>`;
          break;
        case 'next':
          template = `<a href="#" class="tui-page-btn tui-${type}">` +
            `<span class="tui-ico-${type}">
                <svg class="tui-pagination-svg" width="16" height="16">
                  <use href="/sprite.5ec50489.svg#arrow-right"></use>
                </svg>
              </span>` +
            `</a>`;
          break;
        case 'prev':
          template = `<a href="#" class="tui-page-btn tui-${type}">` +
            `<span class="tui-ico-${type}">
              <svg class="tui-pagination-svg" width="16" height="16">
                <use href="/sprite.5ec50489.svg#arrow-left"></use>
              </svg>
            </span>` +
            `</a>`;
          break;
        default: break;
      }

      return template;
    },
    disabledMoveButton: ({
      type
    }) => {
      let template = '';
      const firstPage = 1;
      const lastPage = options.totalItems / options.itemsPerPage;

      switch (type) {
        case 'first':
          template = `<a href = "#" class="tui-page-btn tui-is-disabled tui-${type}">` +
            `<span class="tui-ico-${type}">${firstPage}</span>` + `</a>`;
          break;
        case 'last':
          template = `<a href="#" class="tui-page-btn tui-is-disabled tui-${type}">` +
            `<span class="tui-ico-${type}">${lastPage}</span>` + `</a>`;
          break;
        case 'next':
          template = `<a href="#" class="tui-page-btn tui-is-disabled tui-${type}">` +
            `<span class="tui-ico-${type}">
                <svg class="tui-pagination-svg" width="16" height="16">
                  <use href="/sprite.5ec50489.svg#arrow-right"></use>
                </svg>
              </span>` +
            `</a>`;
          break;
        case 'prev':
          template = `<a href="#" class="tui-page-btn tui-is-disabled tui-${type}">` +
            `<span class="tui-ico-${type}">
              <svg class="tui-pagination-svg" width="16" height="16">
                <use href="/sprite.5ec50489.svg#arrow-left"></use>
              </svg>
            </span>` + `</a>`;
          break;

        default:
          break;
      }

      return template;
    },
    moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination('#tui-pagination-container', options);
console.dir(pagination);

const page = pagination.getCurrentPage();
pagination.on('afterMove', event => {
  const currentPage = event.page;
  const firstPage = document.querySelector('.tui-page-btn.tui-first');
  const lastPage = document.querySelector('.tui-page-btn.tui-last');
  const lastPageNum = options.totalItems / options.itemsPerPage;

  if (currentPage === 2 || currentPage === 3) {
    firstPage.classList.add('tui-is-disabled');
  }

  if (currentPage === 4) {
    firstPage.classList.remove('tui-is-disabled');
  }

  if (currentPage === lastPageNum - 2 || currentPage === lastPageNum - 1) {
    lastPage.classList.add('tui-is-disabled');
  }

  if (currentPage === lastPageNum - 3) {
    lastPage.classList.remove('tui-is-disabled');
  }
});
