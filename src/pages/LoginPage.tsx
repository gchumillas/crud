import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

export default () => {
  const { t } = useTranslation()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const onSubmit = () => console.log('submit!')

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
      <DialogActions>
        {/* TODO: should be disabled while the request is loading */}
        {/* TODO: create a custom 'submit' button */}
        <Button type="submit" onClick={onSubmit}>{t('buttons.continue')}</Button>
      </DialogActions>
    </Dialog>
  )
}