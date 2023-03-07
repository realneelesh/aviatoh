// This code fetches all the urls(including optional urls, though testing for optional URLs is pending) from all the available paths in the database and checks if the links are running or not


const {initializeApp}  = require('firebase/app');
const {getAuth}  = require('firebase/auth');
const { getFirestore, collection, getDocs, query } = require("firebase/firestore");
var fs = require('fs');

const firebaseConfig = {
    apiKey: "AIzaSyDR7-s410uPNtSYw4zVva97SRcjLrALeNw",
    authDomain: "project-2-4dae9.firebaseapp.com",
    projectId: "project-2-4dae9",
    storageBucket: "project-2-4dae9.appspot.com",
    messagingSenderId: "839909928632",
    appId: "1:839909928632:web:9a29480b819af837e10e4d",
    measurementId: "G-1V9C17PCRK"
  };
   
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

const getAllDocuments = async (collec) => {
    return await getDocs(query(collection(db, collec)));
}

const arrr = [];
var arr = arrr;

fs.writeFile('faultyUrls.json', JSON.stringify(arr), (err)=>{
    if (err) throw err;
    console.log('file with faulty urls written');
})


Promise.resolve(getAllDocuments('Disciplines')).then(res => {
    res.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots 
    doc.data().paths?.forEach( path => {
        JSON.parse(path).topics?.forEach(topic => {
            topic.urls?.forEach(url => {
                arrr.push({
                    id: doc.id + " -> " + topic.title + " -> " + url.title,
                    url: url.url
                });
            })

            topic.optionalUrls?.forEach(url => {
                arrr.push({
                    id: "Optional URL ->" +  doc.id + " -> " + topic.title + " -> " + url.title,
                    url: url.url
                });
            })
            
        })
    })
    });
      
}).then(()=>{
    arrr.forEach((item, i) => {
        fetch(item.url)
        .then(res => {
            if(res.status == 200){
                arr.splice(arr.indexOf(y => item.id == y.id), 1);
                fs.writeFileSync('faultyUrls.json', JSON.stringify(arr), (err)=>{
                    if (err) throw err;
                }) 

            } else {
                console.log(item);
            }
        })
        .catch(html => {
            console.log(html);
        })
    });
});
