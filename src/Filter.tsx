import React, {useContext} from 'react'
import {AppContext} from './AppContext'
import Box from '@mui/material/Box'
import {DatePicker} from './DatePicker'

export const Filter = () => {
  const {filter, setFilter} = useContext(AppContext)!
  const {from, to} = filter

  const onFromChange = (value: string | null) => {
    setFilter(value, to)
  }

  const onToChange = (value: string | null) => {
    setFilter(from, value)
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
      <DatePicker label="From" value={from} onChange={onFromChange} />
      <DatePicker label="To" value={to} onChange={onToChange} />
    </Box>
    </React.Fragment>
  );
}
