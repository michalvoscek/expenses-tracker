import React, {useContext, useState} from 'react'
import _ from 'lodash'
import moment from 'moment'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import FormControl from '@mui/material/FormControl'
import {AppContext} from './AppContext'
import {types} from './types'

export const Form = () => {
  const {addTransaction} = useContext(AppContext)!
  const [date, setDate] = useState<string | null>('')
  const [amount, setAmount] = useState<string| null>('')
  const [type, setType] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(date!, Number(amount), type, desc)
    addTransaction(date!, Number(amount), type, desc)
  }
  const setDates = (mnt: moment.Moment | null) => {
    if (mnt) setDate(mnt!.format('YYYY-MM-DD'))
    else setDate(null)
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
        onSubmit={handleSubmit}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="Date"
            inputFormat="YYYY-MM-DD"
            value={date}
            onChange={setDates}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          label="Amount"
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            {_.toPairs(types).map(([key, label]) => <MenuItem key={key} value={key}>{label}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          label="Description"
          variant="outlined"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 3, mb: 2 }}
        >
          Add
        </Button>
      </Box>
    </React.Fragment>
  );
}