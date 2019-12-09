import React from 'react'
import { useAsyncFn } from 'react-use'
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import context from '../context'

export default () => {
  const { t } = useTranslation()
  const { login } = React.useContext(context)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loginState, onLogin] = useAsyncFn(() => login(username, password), [username, password])

  // TODO: notify http errors
  return (
    <Dialog open fullWidth maxWidth="sm">
      <DialogTitle>{t('pages.login.title')}</DialogTitle>
      <DialogContent>
        {/* TODO: add a select field to change the language */}
        {/* TODO: add a 'remember username' checkbox */}
        {/* TODO: create custom text fields */}
        <TextField fullWidth autoFocus autoComplete="username" label={t('pages.login.username')} value={username} onChange={event => setUsername(event.target.value)} />
        <TextField fullWidth autoComplete="password" type="password" label={t('pages.login.password')} value={password} onChange={event => setPassword(event.target.value)} />
      </DialogContent>
      <DialogContent>
        {/* TODO: show a custom error message */}
        {loginState.error && <Typography color="error">{loginState.error.message}</Typography>}
      </DialogContent>
      <DialogActions>
        {/* TODO: should be disabled while the request is loading */}
        {/* TODO: create a custom 'submit' button */}
        <Button disabled={loginState.loading} type="submit" onClick={onLogin}>{t('buttons.continue')}</Button>
      </DialogActions>
    </Dialog>
  )
}