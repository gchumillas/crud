import React from 'react'

type Props = {
  login: (username: string, password: string) => Promise<void>,
  logout: () => void
}

export default React.createContext<Props>({
  login: () => Promise.resolve(),
  logout: () => {}
})