const FirebaseApp = require('firebase/app');
const FirebaseFirestore = require('firebase/firestore');
require('dotenv').config();


const { initializeApp } = FirebaseApp;
const { doc, getFirestore, setDoc, getDoc, collection, getDocs, query } = FirebaseFirestore;



const firebaseConfig = {
    apiKey: "AIzaSyDR7-s410uPNtSYw4zVva97SRcjLrALeNw",
    authDomain: "project-2-4dae9.firebaseapp.com",
    projectId: "project-2-4dae9",
    storageBucket: "project-2-4dae9.appspot.com",
    messagingSenderId: "839909928632",
    appId: "1:839909928632:web:9a29480b819af837e10e4d",
    measurementId: "G-1V9C17PCRK"
};
   
const fbApp = initializeApp(firebaseConfig);

const db = getFirestore(fbApp);

// used with Promise.resolve()
const getAllDocuments = async (collec) => {
    return await getDocs(query(collection(db, collec)));
}

const getDocument = (collec, documentId) => {
    const docRef = doc(db, collec, documentId);
    return getDoc(docRef);
}

const updateOrCreateDocument = async (collec, documentId, newDataObjectToBeMerged) => {
    const docRef = doc(db, collec, documentId);
    return setDoc(docRef, { ...newDataObjectToBeMerged}, { merge: true });
}

 const PremiumAccountsCollection = 'PremiumAccounts';

 module.exports = {
    PremiumAccountsCollection,
    updateOrCreateDocument
 }