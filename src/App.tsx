// TODO: (package.json) some dependencies should be better under devDependencies (for example: @typescript, @types/react, etc...)
// TODO: (package.json) disable automatic browse opening
// TODO: use absolute paths
import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, RouteProps } from 'react-router-dom'
import { CssBaseline, Container } from '@material-ui/core'
import context from './context'
import { login as loginProvider } from './providers/user'
import Header from './components/Header'
import LoginDialog from './routes/LoginDialog'
import HomePage from './routes/HomePage'
import './i18n'

const App = () => {
  const [token, setToken] = React.useState(sessionStorage.getItem('token') || '')

  const login = async (username: string, password: string) => {
    const token = await loginProvider(username, password)

    sessionStorage.setItem('token', token)
    setToken(token)
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    setToken('')
  }

  // TODO: should be in a separate file
  const ProtectedRoute = ({ component: Component, ...rest }: RouteProps) => {
    if (!Component) return null

    return (
      <Route
        {...rest}
        render={props => {
          const referrer = props.location.pathname

          return token
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { referrer } }} />
        }}
      />
    )
  }

  return (
    <context.Provider value={{ token, login, logout }}>
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
            <ProtectedRoute path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </Container>
    </context.Provider>
  )
}

export default App
