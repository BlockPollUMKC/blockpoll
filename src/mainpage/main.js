import React from 'react'
import {withRouter,useHistory } from 'react-router-dom'
import blockpollLogo from '../assets/images/blockpollLogo.jpeg'

import  './main.css'


const Main = () => {

    const history = useHistory()

    const redirectLoginPage = () => {
      history.push('/login')
      window.location.reload()
    }

    const redirectSignUpPage = () => {
        history.push('/signup')
      window.location.reload()
    }

  return (
    <div to='/' className='main-container link-style bg-dark d-flex flex-column justify-content-center align-items-center'>       
        <img alt='blockpoll' src={blockpollLogo} width={100} height={100} className='mb-5'/>
        <button className='btn btn-outline-primary m-1 button' type='button' onClick={redirectLoginPage}>LogIn</button>
        <button className='btn btn-outline-primary m-1' type='button' onClick={redirectSignUpPage}>SignUp</button>       
    </div>
  )
}

export default withRouter(Main)
