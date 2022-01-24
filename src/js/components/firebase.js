// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: 'AIzaSyCNe8So_8snBJMxBI4J-YlfvgcCeLwK0Ls',
  authDomain: 'team-project-filmoteka-9.firebaseapp.com',
  projectId: 'team-project-filmoteka-9',
  storageBucket: 'team-project-filmoteka-9.appspot.com',
  messagingSenderId: '48519743044',
  appId: '1:48519743044:web:215ee1fe35525d1fb7de11',
  measurementId: 'G-V617L01QHL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// ------------------------------------------------------
import { refs } from '../utils/refs';

export function firebaseAuth() {}
