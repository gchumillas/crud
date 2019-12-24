import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { CssBaseline, Container } from '@material-ui/core'
import { appContext } from './context'
import { login as loginProvider } from './providers/user'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import LoginDialog from './routes/LoginDialog'
import HomePage from './routes/HomePage'
import './i18n'

const App = () => {
  const [token, setToken] = React.useState(sessionStorage.getItem('token') || '')

  const login = async (username: string, password: string) => {
    const data = await loginProvider(username, password)
    const { token } = data

    sessionStorage.setItem('token', token)
    setToken(token)
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    setToken('')
  }

  return (
    <appContext.Provider value={{ token, login, logout }}>
      <CssBaseline />
      <Container disableGutters maxWidth="md">
        <Header />
        {/* TODO: missing not-found-page */}
        <BrowserRouter>
          <Switch>
            <Route
              path="/login"
              render={props => {
                const state = props.location.state
                const page = state ? state.referrer : '/'

                return token ? <Redirect to={page} /> : <LoginDialog />
              }}
            />
            <ProtectedRoute token={token} path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </Container>
    </appContext.Provider>
  )
}

export default App
