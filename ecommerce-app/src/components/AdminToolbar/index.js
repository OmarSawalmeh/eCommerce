import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { CheckUserIsAdmin } from '../../Utils'
import { useNavigate } from 'react-router'
import './style.scss'

const mapState = ({user})=>({
   currentUser: user.currentUser
})

function AdminToolbar() {
   const { currentUser } = useSelector(mapState)
   const navigate = useNavigate()

   const isAdmin = CheckUserIsAdmin(currentUser);
   if(!isAdmin){
      return null
   }

   if(!currentUser){
      navigate('/');
   }

  return (
      <div className='adminToolbar'>
        <ul>
          <li>
            <Link to='/admin'>My admin</Link>
          </li>
        </ul>
      </div>
  )
}

export default AdminToolbar