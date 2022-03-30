import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAJfzZjYrVjzY8AJfTXLdz0REwn8pHF-Us",
  authDomain: "disneyplus-clone-e26be.firebaseapp.com",
  projectId: "disneyplus-clone-e26be",
  storageBucket: "disneyplus-clone-e26be.appspot.com",
  messagingSenderId: "632793301791",
  appId: "1:632793301791:web:860131f11fcde6c4a7662a",
  measurementId: "G-J3LJPB5XRD",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// const storage = firebase.storage();

// export { auth, provider, storage };
// export default db;
