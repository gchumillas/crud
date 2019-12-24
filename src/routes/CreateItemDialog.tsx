import React from 'react'
import { useAsyncFn } from 'react-use'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core'
import { appContext, pageContext } from '../lib/context'
import { createItem } from '../providers/item'
import SubmitButton from '../components/buttons/SubmitButton'
import TextField from '../components/fields/TextField'
import TextArea from '../components/fields/TextArea'
import Dialog from '../components/Dialog'

export default () => {
  const history = useHistory()
  const { t } = useTranslation()
  const { token } = React.useContext(appContext)
  const { refresh } = React.useContext(pageContext)
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [state, onSubmit] = useAsyncFn(async () => {
    await createItem(token, title, description)
    refresh()
    history.push('/')
  }, [title, description])

  return (
    <Dialog>
      <DialogTitle>{t('routes.createItem.title')}</DialogTitle>
      <DialogContent>
        <TextField autoFocus required label={t('routes.createItem.titleField')} value={title} onChange={setTitle} />
        <TextArea label={t('routes.createItem.descriptionField')} value={description} onChange={setDescription} />
      </DialogContent>
      <DialogContent>
        {state.error && <Typography color="error">{state.error.message}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button disabled={state.loading} onClick={() => history.push('/')}>{t('buttons.cancel')}</Button>
        <SubmitButton disabled={state.loading} onClick={onSubmit}>{t('buttons.continue')}</SubmitButton>
      </DialogActions>
    </Dialog>
  )
}