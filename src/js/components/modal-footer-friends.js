
const open = document.querySelector('.footer__link');
const close = document.querySelector('.modal__button');
const modal = document.querySelector('.backdrop');

 open.addEventListener('click', toggleModal);
close.addEventListener('click', toggleModal);
 window.addEventListener('click', onCloseModal)
 
 function toggleModal() {
     modal.classList.toggle('is-hidden');
}
function onCloseModal(e) { 
  if (e.target === modal) {
     modal.classList.add('is-hidden');
   }
  
}