import { refs } from "../utils/refs";

refs.libraryButton.hidden = true;
export let signIn = false;

console.log(refs.addButtons);
// refs.addButtons.style.visibility = 'hidden';



const onAutorizationClick = (e) => {
  
  signIn = true;
  toggleSignLibrary(signIn);

}

refs.signInUp.addEventListener('click', onAutorizationClick);

const toggleSignLibrary = (key) => {
  if (key) {
    refs.libraryButton.hidden = false;
    refs.signInUp.hidden = true;    
  }
  else {
    refs.libraryButton.hidden = true;
    refs.signInUp.hidden = false;
  }
};

