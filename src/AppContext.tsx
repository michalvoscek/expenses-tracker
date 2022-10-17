import React, {useState, useMemo} from 'react'
import {sampleTransactions} from './sampleData'

export interface Users {
  [key: string]: {
    password: string,
    transactions: (string | number)[][]
  }
}

interface AppState {
  currentUser: string
  login: (username: string, password: string) => boolean,
  transactions: (string | number)[][],
  filteredTransactions: (string | number)[][],
  filter: {
    from: string | null,
    to: string | null,
  },
  setFilter: (from: string | null, to: string | null) => void,
  addTransaction: (date: string, amount: number, type: string, desc: string) => void,
  logout: () => void
}

export const AppContext = React.createContext<AppState | null>(null)

export const DataLoader = (props: any) => {
  const [currentUser, setCurrentUser] = useState('')
  const [transactions, setTransactions] = useState<(string | number)[][]>([])
  const [filter, setFltr] = useState<{from: string | null, to: string | null}>({from: null, to: null})
  const login = (username: string, password: string) => {
    if (username) {
      setCurrentUser(username)
      setTransactions(sampleTransactions)
      return true
    }
    return false
  }
  const logout = () => {
    setCurrentUser('')
    setTransactions([])
  }
  const setFilter = (from: string | null, to: string | null) => {
    setFltr({from, to})
  }
  const addTransaction = (date: string, amount: number, type: string, desc: string) => {
    setTransactions([...transactions, [date, amount, type, desc]])
  }
  const filteredTransactions = useMemo(() => {
    let res = transactions
    if (filter.from) {
      res = res.filter((t) => t[0] >= filter.from!)
    }
    if (filter.to) {
      res = res.filter((t) => t[0] <= filter.to!)
    }
    return res
  }, [transactions, filter])

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        transactions,
        filter,
        filteredTransactions,
        setFilter,
        addTransaction,
        logout,
      }}>
      {props.children}
    </AppContext.Provider>
  )
}
