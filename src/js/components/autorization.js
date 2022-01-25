// import { refs } from '../utils/refs';
// import { firebaseAuth, user } from './firebase';

// export let signIn = false;

// localStorage.removeItem('user');

// toggleSign(signIn);
// refs.signInUp.addEventListener('click', onAutorizationClick);
// refs.logOut.addEventListener('click', onExitClick);

// function onAutorizationClick(e) {
//   // signIn = true;
//   toggleSign(true);
//   // Убрали скрол
//   document.querySelector('html').classList.add('disable-scroll');

//   // --- Отработка закрытия окна по Esc и клику по дропу ----
//   refs.closeBtn.addEventListener('click', onCloseBtnClick);
//   window.addEventListener('keydown', onCloseEsc);
//   // refs.onDrop.addEventListener('click', onCloseBackdrop);
//   // --------------------------------------------------------

//   refs.createNewUser.addEventListener('click', toggleLogSign);
//   refs.logUser.addEventListener('click', toggleLogSign);

//   firebaseAuth();
// }

// function onExitClick(e) {
//   signIn = false;
//   localStorage.removeItem('user');
//   document.location.href = './index.html';
//   toggleSign(signIn);
// }

// function toggleSign(key) {
//   if (key) {
//     refs.modalAuth.classList.remove('is-hidden');
//   } else {
//     refs.libraryButton.hidden = true;
//     refs.signInUp.hidden = false;
//     refs.logOut.style.visibility = 'hidden';
//     refs.modalAuth.classList.add('is-hidden');
//   }
// }

// function toggleLogSign(e) {
//   refs.formLogin.classList.toggle('active');
//   refs.formSign.classList.toggle('active');
// }

// export function onCloseBtnClick(e) {
//   if (user.isLogin) signLogin();
//   refs.modalAuth.classList.add('is-hidden');
//   document.querySelector('html').classList.remove('disable-scroll');
// }

// function onCloseEsc(e) {
//   if (e.key !== 'Escape') return;
//   onCloseBtnClick(e);
// }

// // function onCloseBackdrop(e) {
// //   if (e.target === e.currentTarget) onCloseBtnClick(e);
// // }

// function signLogin() {
//   refs.libraryButton.hidden = false;
//   refs.signInUp.hidden = true;
//   refs.logOut.style.visibility = 'visible';
// }
