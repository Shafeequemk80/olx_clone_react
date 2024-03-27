import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBBEZ_0_quzfYrWif2s7KoAbAjGjFlFZNI",
  authDomain: "fir-51689.firebaseapp.com",
  projectId: "fir-51689",
  storageBucket: "fir-51689.appspot.com",
  messagingSenderId: "15379644685",
  appId: "1:15379644685:web:c325920652597c29993044",
  measurementId: "G-6L14X419DP"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);


export default firestore  ;



