import userTypes from "./user.types";

const INITIAL_STATE = {
   currentUser: null,
   signinSuccess: false,
   signupSuccess: false,
   signupError: []
}

const userReducer = (state=INITIAL_STATE, action)=>{
   switch (action.type) {
     case userTypes.SET_CURRENT_USER:
       return {
         ...state,
         currentUser: action.payload,
       }
     case userTypes.SIGN_IN_SUCCESS:
       return {
         ...state,
         signinSuccess: action.payload,
       }
     case userTypes.SIGN_UP_SUCCESS:
       return {
         ...state,
         signupSuccess: action.payload,
       }
     case userTypes.SIGN_UP_ERROR:
       return {
         ...state,
         signupError: action.payload,
       }
     case userTypes.RESET_AUTH_FORM:
       return {
         ...state,
         //currentUser: null,
         signinSuccess: false,
         signupSuccess: false,
         signupError: [],
       }
     default:
       return state
   }
}

export default userReducer;