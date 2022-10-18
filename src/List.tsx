import React, {useContext} from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableContainer from '@mui/material/TableContainer'
import Title from './Title'
import {AppContext} from './AppContext'

export const List = () => {
  const {filteredTransactions} = useContext(AppContext)!
  return (
    <React.Fragment>
      <Title>Transactions</Title>
      <TableContainer sx={{maxHeight: 340}}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map(([date, amount, category, desc], i) => (
              <TableRow key={i}>
                <TableCell>{date}</TableCell>
                <TableCell sx={{...(amount > 0 ? {color: 'success.main'} : {})}}>{amount}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{desc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
