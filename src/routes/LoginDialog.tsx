import React from 'react'
import { useAsyncFn } from 'react-use'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import { appContext } from '../lib/context'
import { getErrorStatus } from '../lib/http'
import { getShortLang } from '../lib/i18n'
import SubmitButton from '../components/buttons/SubmitButton'
import TextField from '../components/fields/TextField'

export default () => {
  const { t, i18n } = useTranslation()
  const { login } = React.useContext(appContext)
  const [language, setLanguage] = React.useState(getShortLang(i18n.language))
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [state, submit] = useAsyncFn(() => login(username, password), [username, password])
  const status = state.error && getErrorStatus(state.error)

  const onLanguageChange = (value: string) => {
    i18n.changeLanguage(value)
    setLanguage(value)
  }

  // TODO: (all) add fullWidth and maxWidth to Dialog
  return (
    <Dialog open fullWidth maxWidth="xs" onKeyDown={e => e.key === 'Enter' && submit()}>
      <DialogTitle>{t('routes.login.title')}</DialogTitle>
      <DialogContent>
        {/* TODO: add a 'remember username' checkbox */}
        <FormControl fullWidth>
          <InputLabel>{t('routes.login.language')}</InputLabel>
          <Select value={language} onChange={e => onLanguageChange(`${e.target.value}`)}>
            <MenuItem value="en">{t('routes.login.english')}</MenuItem>
            <MenuItem value="es">{t('routes.login.spanish')}</MenuItem>
          </Select>
        </FormControl>
        <TextField autoFocus autoComplete="username" label={t('routes.login.usernameField')} value={username} onChange={setUsername} />
        <TextField autoComplete="password" type="password" label={t('routes.login.passwordField')} value={password} onChange={setPassword} />
      </DialogContent>
      {status && (
        <DialogContent>
          <DialogContentText color="error">
            {status === 403 ? t('routes.login.invalidCredentials') : t(`http.${status}`)}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <SubmitButton disabled={state.loading} onClick={submit}>{t('buttons.continue')}</SubmitButton>
      </DialogActions>
    </Dialog>
  )
}