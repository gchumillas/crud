import React from 'react'
import { useAsyncFn } from 'react-use'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import { appContext } from '../lib/context'
import { getErrorStatus } from '../lib/http'
import { getShortLang } from '../lib/i18n'
import SelectField from '../components/fields/SelectField'
import TextField from '../components/fields/TextField'
import SubmitButton from '../components/buttons/SubmitButton'

export default () => {
  const { t, i18n } = useTranslation()
  const { login } = React.useContext(appContext)
  const [language, setLanguage] = React.useState(getShortLang(i18n.language))
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [state, submit] = useAsyncFn(() => login(username, password), [username, password])
  const status = state.error && getErrorStatus(state.error)
  const languages = ['en', 'es'].map(value => ({ value, label: t(`routes.login.${value}`) }))

  const onLanguageChange = (value: string) => {
    i18n.changeLanguage(value)
    setLanguage(value)
  }

  return (
    <Dialog open fullWidth maxWidth="xs" onKeyDown={e => e.key === 'Enter' && submit()}>
      <DialogTitle>{t('routes.login.title')}</DialogTitle>
      <DialogContent>
        <SelectField label={t('routes.login.languageField')} value={language} options={languages} onChange={onLanguageChange} />
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