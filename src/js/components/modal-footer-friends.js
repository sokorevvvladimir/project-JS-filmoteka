import confetti from 'canvas-confetti';

const open = document.querySelector('.footer__link');
const close = document.querySelector('.modal__button');
const modal = document.querySelector('.backdrop');
const html = document.querySelector('html');

//  open.addEventListener('click', toggleModal);
// close.addEventListener('click', toggleModal);
window.addEventListener('click', onCloseModal);

//  function toggleModal() {
//    modal.classList.toggle('is-hidden');
//   if ( modal.classList !== 'is-hidden') {
//  showConfetti()
// }
// }

open.addEventListener('click', onOpenModal);
close.addEventListener('click', onClosesModal);

function onOpenModal() {
  document.addEventListener('keydown', closeOnEsc);
  modal.classList.remove('is-hidden');
  showConfetti();
  html.classList.add('stop-scrolling');
}

function onClosesModal() {
  document.removeEventListener('keydown', closeOnEsc);
  modal.classList.add('is-hidden');
  html.classList.remove('stop-scrolling');
}

function onCloseModal(e) {
  if (e.target === modal) {
    document.removeEventListener('keydown', closeOnEsc);
    modal.classList.add('is-hidden');
    html.classList.remove('stop-scrolling');
  }
}

function showConfetti() {
  confetti.create(document.getElementById('canvas'), {
    resize: true,
    useWorker: true,
  })({ particleCount: 200, spread: 200, zIndex: 200 });
}

const closeOnEsc = e => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    onClosesModal();
  }
};
