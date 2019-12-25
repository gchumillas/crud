import React from 'react'
import { useAsyncFn } from 'react-use'
import { useTranslation } from 'react-i18next'
import { DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import { appContext } from '../lib/context'
import { getStatus, translateStatus } from '../lib/http'
import SubmitButton from '../components/buttons/SubmitButton'
import TextField from '../components/fields/TextField'
import Dialog from '../components/Dialog'

export default () => {
  const { t } = useTranslation()
  const { login } = React.useContext(appContext)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [state, submit] = useAsyncFn(() => login(username, password), [username, password])
  const status = state.error && getStatus(state.error)

  // TODO: notify http errors
  return (
    <Dialog onKeyDown={e => e.key === 'Enter' && submit()}>
      <DialogTitle>{t('routes.login.title')}</DialogTitle>
      <DialogContent>
        {/* TODO: add a select field to change the language */}
        {/* TODO: add a 'remember username' checkbox */}
        <TextField autoFocus autoComplete="username" label={t('routes.login.usernameField')} value={username} onChange={setUsername} />
        <TextField autoComplete="password" type="password" label={t('routes.login.passwordField')} value={password} onChange={setPassword} />
      </DialogContent>
      {status && (
        <DialogContent>
          <DialogContentText color="error">{translateStatus(t, 'routes.login', status)}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <SubmitButton disabled={state.loading} onClick={submit}>{t('buttons.continue')}</SubmitButton>
      </DialogActions>
    </Dialog>
  )
}