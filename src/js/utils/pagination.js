import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const options = { 
  totalItems: 20,
  itemsPerPage: 20,
  visiblePages: 50,
  page: 1,
//   centerAlign: false,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     moveButton: '<a href="#" class="tui-page-btn tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</a>',
//     disabledMoveButton: '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</span>',
//     moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//       '<span class="tui-ico-ellip">...</span>' +
//       '</a>'
//   }
};
// const container = document.getElementById('tui-pagination-container');
const pagination = new Pagination('#tui-pagination-container', options);
console.dir(pagination);
const page = pagination.getCurrentPage()
fetchMoviesCard(page)
function fetchMoviesCard(_page) {
    return fetch(`${BASE_URL}/movie/{movie_id}/lists?api_key=${API_KEY}&language=en-US&page=1`,)
        .then(res => res.json())
        .then(data => ({}))  
}