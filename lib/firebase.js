// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
      apiKey: "AIzaSyBR3RiVIGpBwmFbwycC9amdh9x6KqCir_M",
      authDomain: "hasmen-8eba0.firebaseapp.com",
      projectId: "hasmen-8eba0",
      storageBucket: "hasmen-8eba0.firebasestorage.app",
      messagingSenderId: "992187142687",
      appId: "1:992187142687:web:c24dd992ed61ee80d43b2a",
      measurementId: "G-70RKFK8HGX"
    };
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
