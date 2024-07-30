import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut } from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAm5ji84ASdd7oBNYe_X8kLKH-UOWQA8R0",
  authDomain: "netflix-e0466.firebaseapp.com",
  projectId: "netflix-e0466",
  storageBucket: "netflix-e0466.appspot.com",
  messagingSenderId: "569841518618",
  appId: "1:569841518618:web:e4573eb41b31ae8a33a9a3",
  measurementId: "G-QB5G5FH3MB"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
    })
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};
// const analytics = getAnalytics(app);