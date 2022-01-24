import confetti from 'canvas-confetti';
// import { refs } from '../utils/refs.js';
import { refs } from '../utils/refs';

const open = document.querySelector('.footer__link');
const close = document.querySelector('.modal__button');
const modal = document.querySelector('.backdrop');

//  open.addEventListener('click', toggleModal);
// close.addEventListener('click', toggleModal);
 window.addEventListener('click', onCloseModal)
 
//  function toggleModal() {
//    modal.classList.toggle('is-hidden');
//   if ( modal.classList !== 'is-hidden') {
//  showConfetti()
// }
// }

 open.addEventListener('click', onOpenModal);
close.addEventListener('click', onClosesModal);
function onOpenModal() {
  modal.classList.remove('is-hidden');
  showConfetti();
  refs.html.classList.add('disable-scroll');
}

function onClosesModal() { 
  modal.classList.add('is-hidden')
  refs.html.classList.remove('disable-scroll');
}

function onCloseModal(e) { 
  if (e.target === modal) {
     modal.classList.add('is-hidden');
   }
  
}

function showConfetti() {
  confetti.create(document.getElementById('canvas'), {
    resize: true,
    useWorker: true,
  })({ particleCount: 200, spread: 200, zIndex: 200});
}



