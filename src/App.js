import React, { Component, Fragment } from 'react'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'

import Main from './mainpage/main'
import Login from './Login/login'
import Signup from './signup/signup'
import Homepage from './Homepage/homepage'

import './App.css'

export class App extends Component {
  render() {
    return (
      <Fragment >
       <BrowserRouter>
       <div className='main-container'>
       <Switch>
       <Route exact path= '/' component={Main} />
       <Route exact path='/login' component={Login} />
       <Route exact path='/home' component={Homepage} />
       <Route exact path='/signup' component={Signup} />
       <Redirect to='/' />
 
       </Switch>
       </div>
       
        </BrowserRouter>
        
      </Fragment>
    )
  }
}

export default App
