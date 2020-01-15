import React from 'react'
import _ from 'lodash'
import { useAsyncFn } from 'react-use'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import { appContext, pageContext } from '../lib/context'
import { HTTP_UNAUTHORIZED } from '../lib/http'
import { createItem } from '../providers/item'
import SubmitButton from '../components/buttons/SubmitButton'
import TextField from '../components/fields/TextField'
import TextArea from '../components/fields/TextArea'

export default () => {
  const history = useHistory()
  const { t } = useTranslation()
  const { token, logout } = React.useContext(appContext)
  const { refresh } = React.useContext(pageContext)
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  const [state, onSubmit] = useAsyncFn(async () => {
    if (!title) {
      throw new Error('errors.requiredFields')
    }

    await createItem(token, title, description)
    refresh()
    history.push('/')
  }, [title, description])

  const status = _.get(state.error, 'response.status')
  const message = status ? `http.${status}` : _.get(state.error, 'message')

  if (status === HTTP_UNAUTHORIZED) {
    logout()
  }

  return (
    <Dialog open fullWidth maxWidth="sm">
      <DialogTitle>{t('routes.createItem.title')}</DialogTitle>
      <DialogContent>
        <TextField autoFocus required label={t('routes.createItem.titleField')} value={title} onChange={setTitle} />
        <TextArea label={t('routes.createItem.descriptionField')} value={description} onChange={setDescription} />
      </DialogContent>
      {message && (
        <DialogContent>
          <DialogContentText color="error">{t(message)}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button disabled={state.loading} onClick={() => history.push('/')}>{t('buttons.cancel')}</Button>
        <SubmitButton disabled={state.loading} onClick={onSubmit}>{t('buttons.continue')}</SubmitButton>
      </DialogActions>
    </Dialog>
  )
}