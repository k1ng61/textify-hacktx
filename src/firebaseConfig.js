
import firebase from 'firebase/compat/app'

import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {getDatabase} from 'firebase/database'


const firebaseConfig = {
    apiKey: "AIzaSyCRQqIS3Xavxkg2HOi3cAwebLiNPORn8cM",
    authDomain: "hacktx-d5e25.firebaseapp.com",
    projectId: "hacktx-d5e25",
    storageBucket: "hacktx-d5e25.appspot.com",
    messagingSenderId: "360545667596",
    appId: "1:360545667596:web:5267638eb7611a768efc29",
    measurementId: "G-KWQE84RD10"
};

const app = firebase.initializeApp(firebaseConfig);



export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const dbase = getDatabase(app);