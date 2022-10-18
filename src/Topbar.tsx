import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {AppContext} from './AppContext'

export const Topbar = () => {
  const appContext = useContext(AppContext)!
  const currentUser: string = appContext.currentUser
  const navigate = useNavigate()
  const login = () => {
    navigate('/login')
  }
  const logout = () => {
    appContext.logout()
  }
  return (<Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
      <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
          Expense Tracker
        </Typography>
        <Typography variant="h6" component="div">
          {currentUser}
        </Typography>
        {currentUser ?
          <Button onClick={logout} color="inherit">Logout</Button>
          :
          <Button onClick={login} color="inherit">Login</Button>
        }
      </Toolbar>
    </AppBar>
  </Box>)
}