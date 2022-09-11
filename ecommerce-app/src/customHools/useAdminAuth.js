import { useEffect } from "react";
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router";

import {CheckUserIsAdmin} from './../Utils'
const mapState = ({user}) => ({
   currentUser: user.currentUser
})

const useAdminAuth = props=>{
   const { currentUser } = useSelector(mapState);
   const navigate = useNavigate()


   useEffect(() => {
     if (!CheckUserIsAdmin(currentUser)) {
       navigate('/admin')
     }
   }, [currentUser])

   useEffect(() => {
      if (!currentUser) {
      navigate('/')
      }
   }, [currentUser])

   return currentUser;
}

export default useAdminAuth;