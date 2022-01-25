// import { User } from '../utils/user-class';
// import {onCloseBtnClick} from './autorization'

// import Notiflix from 'notiflix';

// const API_KEY = 'AIzaSyAOOAB_dQz8yKtffWbD-npJ5riEOwOX74Q';

// export const user = new User();

// export function firebaseAuth() {
//   const formLogin = document.querySelector('.form-login');
//   formLogin.addEventListener('submit', onLoginSubmit, { once: true });
//   const formSign = document.querySelector('.form-sign');
//   formSign.addEventListener('submit', onSignSubmit, { once: true });
// }

// //heandler for form

// function onLoginSubmit(event) {
//   event.preventDefault();
//   const email = event.target.querySelector('#email').value;
//   const password = event.target.querySelector('#password').value;

//   signInWithPassword(email, password)
//   .then(data => {isIdToken(data)
//     if (user.isLogin) {onCloseBtnClick(event)};
//   })

// }

// function onSignSubmit(event) {
//   event.preventDefault();

//   const email = event.target.querySelector('#email1').value;
//   const pass1 = event.target.querySelector('#pass1').value;
//   const pass2 = event.target.querySelector('#pass2').value;

//   if (pass1.length < 6) {
//     onCloseBtnClick(event)
//     return Notiflix.Notify.warning('Password too short. Try again!');}
//   if (pass1 !== pass2) {
//     onCloseBtnClick(event)
//     return Notiflix.Notify.failure('Invalid repeat password. Try again!');}

//   user.email = email;
//   signUp(email, pass1).then(data => {isIdToken(data)
//     if (user.isLogin) {onCloseBtnClick(event)};
//   });
// }

// async function signInWithPassword(email, password) {
//   const apiKey = API_KEY;
//   try {
//     const response = await fetch(
//       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
//       {
//         method: 'POST',
//         body: JSON.stringify({ email, password, returnSecureToken: true }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     return await response.json();
//   } catch (error) {
//     return console.log(error);
//   }
// }

// async function signUp(email, password) {
//   const apiKey = API_KEY;

//   try {
//     const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
//     {
//       method: 'POST',
//       body: JSON.stringify({ email, password, returnSecureToken: true }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return await response.json();
//   } catch (error) {
//     return console.log(error);
//   }
// }

// function isIdToken(data) {
//   if (!data.idToken) {
//     onCloseBtnClick({})  ;
//     return Notiflix.Notify.failure('Invalid email or password, try again');
//   }
//   console.log(data);
//   user.userLogin(data.email, data.idToken, data.localId);
//   console.log(user);
//   localStorage.setItem('user', JSON.stringify({ user }));
//   Notiflix.Notify.success('Login successfuly !!!');
// }

// // чтение-запись -------------------------------
// // Как их интегрировать в наш проект - не представляю

// // export function readFromFBHundler(watchOrQueue) {
// //   return fetch(
// //     `https://gitpodmy-default-rtdb.europe-west1.firebasedatabase.app/collection/${user.idLocal}/${watchOrQueue}.json?auth=${user.id}`,
// //   )
// //     .then(response => response.json())
// //     .then(response => {
// //       if (response && response.error) {
// //         Notiflix.Notify.failure('Read error !!!')
// //       }
// //       return response
// //         ? Object.keys(response).map(key => ({
// //             ...response[key],
// //             id: key,
// //           }))
// //         : [];
// //     });
// // }

// // export function writeToFBHundler(watchOrQueue, object) {
// //   return fetch(
// //     `https://gitpodmy-default-rtdb.europe-west1.firebasedatabase.app/collection/${user.idLocal}/${watchOrQueue}.json?auth=${user.id}`,
// //     {
// //       method: 'POST',
// //       body: JSON.stringify(object),
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     },
// //   )
// //     .then(response => response.json())
// //     .then(data => console.log(data));
// // }
