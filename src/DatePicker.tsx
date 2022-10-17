import moment from 'moment'
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker'
import TextField from '@mui/material/TextField'

export const DatePicker = (props: {
  label:string,
  value: (string | null),
  onChange: (val: string | null) => void
}) => {
  const setDate = (mnt: moment.Moment | null) => {
    if (mnt && mnt.isValid()) props.onChange(mnt!.format('YYYY-MM-DD'))
    else props.onChange(null)
  }
  return (<LocalizationProvider dateAdapter={AdapterMoment}>
    <DesktopDatePicker
      label={props.label}
      inputFormat="YYYY-MM-DD"
      value={props.value}
      onChange={setDate}
      renderInput={(params) => <TextField {...params} />}
    />
  </LocalizationProvider>)
}
