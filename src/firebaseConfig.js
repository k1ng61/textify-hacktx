
import firebase from 'firebase/compat/app'

import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {getDatabase} from 'firebase/database'


const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

const app = firebase.initializeApp(firebaseConfig);



export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const dbase = getDatabase(app);