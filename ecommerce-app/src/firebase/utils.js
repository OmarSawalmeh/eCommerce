import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const GoogleProvider = new firebase.auth.GoogleAuthProvider()
GoogleProvider.setCustomParameters({prompt: 'select_account'});
export const signinWithGoogle = () => auth.signInWithPopup(GoogleProvider)

export const handleUserProfile = async(userAuth, additionalData)=>{
   //console.log('User data', userAuth)
   if(!userAuth) return;

   const {uid} = userAuth;
   const userRef = firestore.doc(`users/${uid}`);
   const snapshot = await userRef.get();

   // if user not store in database until now
   if(!snapshot.exists){
      const {displayName, email} = userAuth;
      const timestamp = new Date();
      try {
         await userRef.set({
            displayName,
            email,
            createdDate: timestamp,
            ...additionalData
         })
      } catch (error) {
         //console.log(error);
      }
   }
   return userRef;
}