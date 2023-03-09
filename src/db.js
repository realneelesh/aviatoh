
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc, getDoc, collection, getDocs, query } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
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