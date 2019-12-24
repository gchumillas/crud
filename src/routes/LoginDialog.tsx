import React from 'react'
import { useAsyncFn } from 'react-use'
import { useTranslation } from 'react-i18next'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@material-ui/core'
import { appContext } from '../lib/context'

export default () => {
  const { t } = useTranslation()
  const { login } = React.useContext(appContext)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loginState, onLogin] = useAsyncFn(() => login(username, password), [username, password])

  // TODO: notify http errors
  return (
    <Dialog open fullWidth maxWidth="sm" onKeyDown={e => e.key === 'Enter' && onLogin()}>
      <DialogTitle>{t('routes.login.title')}</DialogTitle>
      <DialogContent>
        {/* TODO: add a select field to change the language */}
        {/* TODO: add a 'remember username' checkbox */}
        {/* TODO: create custom text fields */}
        <TextField fullWidth autoFocus autoComplete="username" label={t('routes.login.usernameField')} value={username} onChange={event => setUsername(event.target.value)} />
        <TextField fullWidth autoComplete="password" type="password" label={t('routes.login.passwordField')} value={password} onChange={event => setPassword(event.target.value)} />
      </DialogContent>
      <DialogContent>
        {/* TODO: show a custom error message */}
        {loginState.error && <Typography color="error">{loginState.error.message}</Typography>}
      </DialogContent>
      <DialogActions>
        {/* TODO: create a custom 'submit' button */}
        <Button disabled={loginState.loading} type="submit" onClick={onLogin}>{t('buttons.continue')}</Button>
      </DialogActions>
    </Dialog>
  )
}