import React, {useContext} from 'react'
import _, { List } from 'lodash'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {AppContext} from './AppContext'

const transform = (name: string, trs: (string | number)[][]): {[x: string]: number | string} => {
  const grp = _.groupBy(trs, (t) => t[2])
  const maps: {[x: string]: number | string} = _.mapValues(grp, (arr) => Math.abs(_.sum(arr.map((r) => r[1]))))
  maps.name = name
  return maps
}

export const Chart = () => {
  const {filteredTransactions} = useContext(AppContext)!
  const incomes = filteredTransactions.filter((t) => t[1] >= 0)
  const expenses = filteredTransactions.filter((t) => t[1] < 0)
  const data = [
    transform('expenses', expenses),
    transform('incomes', incomes),
  ]
  return (
    <React.Fragment>
      {/*<Title>Today</Title>*/}
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="food" stackId="a" fill="#8884d8" />
          <Bar dataKey="utility" stackId="a" fill="#82ca9d" />
          <Bar dataKey="clothes" stackId="a" fill="#3298a6" />
          <Bar dataKey="salary" stackId="a" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}