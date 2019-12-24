// TODO: move this file to lib
import React from 'react'

export const appContext = React.createContext<{
  token: string,
  login: (username: string, password: string) => Promise<void>,
  logout: () => void
}>({
  token: '',
  login: () => Promise.resolve(),
  logout: () => { }
})

export const pageContext = React.createContext({
  refresh: () => {}
})