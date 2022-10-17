import React, {useContext} from 'react'
import {AppContext} from './AppContext'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker'
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'

export const Filter = () => {
  const {filter, setFilter} = useContext(AppContext)!
  const {from, to} = filter

  const onFromChange = (value: moment.Moment | null) => {
    setFilter(value && value.format('YYYY-MM-DD'), to)
  }

  const onToChange = (value: moment.Moment | null) => {
    setFilter(from, value && value.format('YYYY-MM-DD'))
  }

  return (
    <React.Fragment>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label="From"
          inputFormat="YYYY-MM-DD"
          value={from}
          onChange={onFromChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="To"
          inputFormat="YYYY-MM-DD"
          value={to}
          onChange={onToChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
    </React.Fragment>
  );
}
