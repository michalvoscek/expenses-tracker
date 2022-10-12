import React, {useContext} from 'react'
import {Route, BrowserRouter, Navigate, Routes} from "react-router-dom"
import './App.css'
import {DataLoader, AppContext} from './AppContext'
import {Login} from './Login'
import {Dashboard} from './Dashboard'

const App = () => {
  const appContext = useContext(AppContext)!
  const redirectToLogin: boolean = !appContext.currentUser
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {redirectToLogin && <Route
              path="*"
              element={<Navigate to="/login" replace />}
          />}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default () => (
  <DataLoader>
    <App/>
  </DataLoader>
);

