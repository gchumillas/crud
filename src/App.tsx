// TODO: (package.json) some dependencies should be better under devDependencies (for example: @typescript, @types/react, etc...)
// TODO: (package.json) add a 'yarn compile' script
// TODO: (package.json) disable automatic browse opening
import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, RouteProps } from 'react-router-dom'
// TODO: use absolute paths
import Header from './components/Header'
import CssBaseline from '@material-ui/core/CssBaseline'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import './i18n'

const App = () => {
  const token = ''

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
    <>
      <Header />
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={props => {
              const state = props.location.state
              const page = state ? state.referrer : '/'

              return token ? <Redirect to={page} /> : <LoginPage />
            }}
          />
          <ProtectedRoute path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
