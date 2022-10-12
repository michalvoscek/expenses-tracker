import React, {useContext} from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from './Title'
import { AppContext } from './AppContext'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  const {transactions} = useContext(AppContext)!
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(([date, amount, category, desc], i) => (
            <TableRow key={i}>
              <TableCell>{date}</TableCell>
              <TableCell>{amount}</TableCell>
              <TableCell>{category}</TableCell>
              <TableCell>{desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
