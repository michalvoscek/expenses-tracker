import React, {useContext, useEffect} from 'react'
import {Route, Navigate, useNavigate, useLocation} from "react-router-dom"
import {DataLoader, AppContext} from './AppContext'
import {Dashboard} from './Dashboard'

export const Routes = () => {
  const appContext = useContext(AppContext)!
  const redirectToLogin: boolean = !appContext.currentUser
  const navigate = useNavigate()
  const location = useLocation()
  console.log({redirectToLogin, user: appContext.currentUser, location})
  useEffect(() => {
    if (redirectToLogin && location.pathname !== '/login') navigate('/login')
  }, [redirectToLogin, location.pathname])
  
  return (
    <React.Fragment>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />}/>
    </React.Fragment>
  );
}
