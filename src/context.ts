import React from 'react'

type Props = {
  token: string,
  login: (username: string, password: string) => Promise<void>,
  logout: () => void
}

export default React.createContext<Props>({
  token: '',
  login: () => Promise.resolve(),
  logout: () => { }
})