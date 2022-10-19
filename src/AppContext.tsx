import React, {useState, useMemo} from 'react'
import {sampleTransactions} from './sampleData'
import {transaction, category} from './types'

interface AppState {
  currentUser: string
  login: (username: string, password: string) => boolean,
  transactions: transaction[],
  filteredTransactions: transaction[],
  filter: {
    from: string | null,
    to: string | null,
  },
  setFilter: (from: string | null, to: string | null) => void,
  addTransaction: (date: string, amount: number, type: category, desc: string) => void,
  logout: () => void
}

export const AppContext = React.createContext<AppState | null>(null)

export const DataLoader = (props: any) => {
  const [currentUser, setCurrentUser] = useState('')
  const [transactions, setTransactions] = useState<transaction[]>([])
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
    setFltr({from: null, to: null})
  }
  const setFilter = (from: string | null, to: string | null) => {
    setFltr({from, to})
  }
  const addTransaction = (date: string, amount: number, type: category, desc: string) => {
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
