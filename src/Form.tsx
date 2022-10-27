import React, {useContext, useState} from 'react'
import _ from 'lodash'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import {AppContext} from './AppContext'
import {DatePicker} from './DatePicker'
import {types, category} from './types'

const getAmountError = (value: string): boolean => {
  if (!value || isNaN(Number(value))) {
    return true
  } else {
    return false
  }
}

export const Form = () => {
  const {addTransaction} = useContext(AppContext)!
  const [date, setDate] = useState<string | null>(null)
  const [amount, setAmount] = useState<string>('')
  const [amountError, setAmountError] = useState<boolean>(false)
  const [type, setType] = useState<category | null>(null)
  const [desc, setDesc] = useState<string>('')
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const amntErr = getAmountError(amount)
    setAmountError(amntErr)
    if (amntErr) return
    setDate(null)
    setAmount('')
    setType(null)
    setDesc('')
    addTransaction(date!, Number(amount),type!, desc)
  }

  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {m: 1, width: '25ch'},
        }}
        noValidate
        onSubmit={handleSubmit}
      >
        <DatePicker label="Date" value={date} onChange={setDate} />
        <TextField
          error={amountError}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          label="Amount"
          variant="outlined"
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value as category)}
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
