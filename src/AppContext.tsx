import React, {useState, useEffect} from 'react'

export interface Users {
  [key: string]: {
    password: string,
    transactions: (string | number)[][]
  }
}

export interface AppState {
  currentUser: string
  login: (username: string, password: string) => boolean,
  transactions: (string | number)[][]
}

export const AppContext = React.createContext<AppState | null>(null)

const defaultLocalStorage = JSON.stringify({
  michal: {
    password: "michal",
    transactions: [
      ['2022-10-01', -8, 'food', 'suermarket'],
      ['2022-10-03', -15, 'utility', 'electricity bill'],
      ['2022-10-09', -20, 'clothes', 'pants'],
      ['2022-10-11', -5, 'food', 'lunch'],
      ['2022-10-15', 2000, 'salary', 'pay'],
      ['2022-10-23', -5, 'utility', 'internet'],
    ]}})

export const DataLoader = (props: any) => {
  const [currentUser, setCurrentUser] = useState('')
  const [transactions, setTransactions] = useState<(string | number)[][]>([])
  const login = (username: string, password: string) => {
    const localItem: string|null = localStorage.getItem('users')
    const users: Users = JSON.parse(localItem ?? defaultLocalStorage)
    if (username in users && users[username].password === password) {
      setCurrentUser(username)
      setTransactions(users[username].transactions)
      return true
    }
    return false
  }

  return (
    <AppContext.Provider value={{currentUser, login, transactions}}>
      {props.children}
    </AppContext.Provider>
  )
}
