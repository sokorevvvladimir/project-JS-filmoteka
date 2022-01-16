// const link = document.querySelector('[data-modal-open]');
// console.log(link.textContent)
// link.addEventListener('click', onOpenList);

// function onOpenList() {

// }

// (() => {
//    const refs = {
//      openModalBtn: document.querySelector('[data-modal-open]'),
//      closeModalBtn: document.querySelector('[data-modal-close]'),
//      modal: document.querySelector('[data-modal]'),
//    };
 
//    refs.openModalBtn.addEventListener('click', toggleModal);
//    refs.closeModalBtn.addEventListener('click', toggleModal);
 
//    function toggleModal() {
//      refs.modal.classList.toggle('is-hidden');
//    }
//  })();

const open = document.querySelector('.footer__link');
const close = document.querySelector('.modal__button');
const modal = document.querySelector('.backdrop');

 open.addEventListener('click', toggleModal);
 close.addEventListener('click', toggleModal);
 
 function toggleModal() {
     modal.classList.toggle('is-hidden');
   }