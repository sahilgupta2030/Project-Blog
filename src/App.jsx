import { useState , useEffect } from 'react'
import { useDispatch } from "react-redux"
import authService from "../src/appwrite/auth"
import {logIn , logOut} from "../src/store/authSlice"
import './App.css'
import { Footer, Header } from './components'

function App() {
  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(logIn({userData}))
      } else {
        dispatch(logOut())
      }
    })
    .finally(() => setLoading(false))
  } , [])

  return !loading ? (
  
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header/>
          <main>
            {/* <Outlet/> */}
          </main>
          <Footer/>
        </div>
      </div>
  ) : null
}

export default App
