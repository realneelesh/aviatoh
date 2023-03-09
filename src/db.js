
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc, getDoc, collection, getDocs, query } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyDR7-s410uPNtSYw4zVva97SRcjLrALeNw",
    authDomain: "project-2-4dae9.firebaseapp.com",
    projectId: "project-2-4dae9",
    storageBucket: "project-2-4dae9.appspot.com",
    messagingSenderId: "839909928632",
    appId: "1:839909928632:web:9a29480b819af837e10e4d",
    measurementId: "G-1V9C17PCRK"
  };
   
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const getAllDocuments = async (collec) => {
    return await getDocs(query(collection(db, collec)));
}

export const getDocument = (collec, documentId) => {
    const docRef = doc(db, collec, documentId);
    return getDoc(docRef);
}

export const updateOrCreateDocument = async (collec, documentId, newDataObjectToBeMerged) => {
    // always pass author:email in the newDataObjectToBeMerged, used to the rule in sequirity rules for firestore
    const docRef = doc(db, collec, documentId);
    return setDoc(docRef, { ...newDataObjectToBeMerged}, { merge: true });
}

export const usersCollection = 'Users';
export const disciplinesCollection = 'Disciplines';
export const topicMRCollection = 'TopicMergeRequests';