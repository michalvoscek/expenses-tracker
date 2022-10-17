import React, {useContext} from 'react'
import {BrowserRouter, Route,  Routes, Navigate} from "react-router-dom"
import './App.css'
import {DataLoader, AppContext} from './AppContext'
import {Topbar} from './Topbar'
import {Login} from './Login'
import {Dashboard} from './Dashboard'

const App = () => {
  const appContext = useContext(AppContext)!
  const redirectToLogin: boolean = !appContext.currentUser
  return (
    <div className="App">
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          {redirectToLogin ?
            <Route path="*" element={<Navigate to="/login" replace />}/> :
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />}/>
              </>
          }
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

