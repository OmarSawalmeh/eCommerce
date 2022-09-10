import userTypes from './user.types';
import { auth, handleUserProfile } from './../../firebase/utils'

export const setCurrentUser = user =>({
   type: userTypes.SET_CURRENT_USER,
   payload: user
}) 

export const signinUser =({ email, password }) =>
  async (dispatch) => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      })
    } catch (error) {
      //console.log(error);
    }
  }

  export const signupUser = ({ displayName, email, password, confirmPassword }) => async dispatch =>{
     if (password !== confirmPassword) {
       const err = ["Password Don't match"]
       dispatch({
        type: userTypes.SIGN_UP_ERROR,
        payload: err
       })
       return
     }

     try {
       //console.log('email, password ==>', email, password);
       // const user = await auth.createUserWithEmailAndPassword(email, password)
       let user = ''
       auth.createUserWithEmailAndPassword(email, password)
         .then((userCredential) => {
           user = userCredential.user
         })
         .catch((error) => {
           //console.log('err message ==>', error.message)
           dispatch({
             type: userTypes.SIGN_UP_ERROR,
             payload: [error.message],
           })
           return
         })
       //console.log('display name', displayName);
       await handleUserProfile(user, { displayName })
       dispatch({
        type: userTypes.SIGN_UP_SUCCESS,
        payload: true
       })
     } catch (error) {
       //console.log(error);
     }
  }

  export const resetAllAuthForms = ()=>({
    type: userTypes.RESET_AUTH_FORM
  })