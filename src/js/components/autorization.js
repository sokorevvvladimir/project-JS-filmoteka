import { refs } from "../utils/refs";

export let signIn = false;

toggleSign(signIn);


const onAutorizationClick = (e) => {

  signIn = true;
  toggleSign(signIn);

}

const onExitClick = (e) => {

  signIn = false;
  document.location.href = document.getElementById('home');
  toggleSign(signIn);

}; 

refs.signInUp.addEventListener('click', onAutorizationClick);
refs.logOut.addEventListener('click', onExitClick);

function toggleSign (key) {

  if (key) {
    refs.libraryButton.hidden = false;
    refs.signInUp.hidden = true; 
    refs.logOut.style.visibility = "visible";
  }
  else {
    refs.libraryButton.hidden = true;
    refs.signInUp.hidden = false;
    refs.logOut.style.visibility = "hidden";
    
  }
}

