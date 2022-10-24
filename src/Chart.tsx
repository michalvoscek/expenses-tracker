import React, {useContext} from 'react'
import _ from 'lodash'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {AppContext} from './AppContext'
import {transaction} from './types'

/*const transform = (name: string, trs: transaction[]): {[x: string]: number | string} => {
  const grp = _.groupBy(trs, (t) => t[2])
  const maps: {[x: string]: number | string} = _.mapValues(grp, (arr) => Math.abs(_.sum(arr.map((r) => r[1]))))
  maps.name = name
  return maps
}*/

const transform = (name: string, trs: transaction[]): {[x: string]: number | string} => {
  return {
    name,
    ..._.flow([
      _.partialRight(_.groupBy, (t: transaction) => t[2]),
      _.partialRight(_.mapValues, (arr: transaction[]) => _.flow([
        _.partialRight(_.map, (r: transaction) => r[1]),
        _.sum,
        Math.abs,
      ])(arr)),
    ])(trs)
  }
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