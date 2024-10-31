import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import Login from './Components/Login'
import Home from './Components/Home/Home'
import Header from './Components/Header/Header'
import { getUserAuth } from './Redux/Actions/Index'
import { connect } from 'react-redux'
import RequiredAuth from './Components/RequiredAuth'

const App = (props) => {
  useEffect(() => {
    props.authchange()
  }, [])



  return (

    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={

          <RequiredAuth>
            <Header />
            <Home />
          </RequiredAuth>

        } />
      </Routes>
    </Router>
  )
}
const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    authchange: () => dispatch(getUserAuth())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
