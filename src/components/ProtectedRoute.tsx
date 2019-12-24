import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

type Props = RouteProps & {
  token: string
}

export default ({ component: Component, token, ...rest }: Props) => {
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