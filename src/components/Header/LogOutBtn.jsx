import React from 'react'
import {useDispatch} from "react-redux"
import authService from "../../appwrite/auth"
import {logOut} from "../../store/authSlice"

function LogOutBtn() {
    const dispatch = useDispatch()
    const logOutHandler = () => {
        authService.logOut().then(()=> {
            dispatch(logOut())
        })
    }
  return (
    <button 
    className='inline-bock px-6 duration-200 hover:bg-blue-200 rounded-full' 
    onClick={logOutHandler}
    >
        Logout
    </button>
  )
}

export default LogOutBtn