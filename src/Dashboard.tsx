import React from 'react'
import {createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {Chart} from './Chart'
import {List} from './List'
import {Filter} from './Filter'
import {Form} from './Form'

const mdTheme = createTheme()

function DashboardContent() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Filter */}
              <Grid item xs={12}>
                <Paper sx={{p: 2, display: 'flex',flexDirection: 'column'}}>
                  <Filter />
                </Paper>
              </Grid>
              {/* Chart */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* List */}
              <Grid item xs={12}>
                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                  <List />
                </Paper>
              </Grid>
              {/* Add */}
              <Grid item xs={12}>
                <Paper sx={{p: 2, display: 'flex',flexDirection: 'column'}}>
                  <Form />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export const Dashboard = () => {
  return <DashboardContent />
}