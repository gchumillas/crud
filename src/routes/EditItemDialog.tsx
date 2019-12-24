import React from 'react'
import { useAsyncFn, useAsync } from 'react-use'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { Button, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core'
import { appContext, pageContext } from '../lib/context'
import { readItem, updateItem } from '../providers/item'
import SubmitButton from '../components/buttons/SubmitButton'
import TextField from '../components/fields/TextField'
import TextArea from '../components/fields/TextArea'
import Dialog from '../components/Dialog'

export default () => {
  const history = useHistory()
  const params = useParams<{ id: string }>()
  const { t } = useTranslation()
  const { token } = React.useContext(appContext)
  const { refresh } = React.useContext(pageContext)
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  const initState = useAsync(async () => {
    const data = await readItem(token, params.id)

    setTitle(data.title)
    setDescription(data.description)
  }, [params.id])

  const [submitState, onSubmit] = useAsyncFn(async () => {
    await updateItem(token, params.id, title, description)
    refresh()
    history.push('/')
  }, [params.id, title, description])

  const loading = initState.loading || submitState.loading
  const error = initState.error || submitState.error

  return (
    <Dialog>
      <DialogTitle>{t('routes.editItem.title')}</DialogTitle>
      <DialogContent>
        <TextField autoFocus required label={t('routes.editItem.titleField')} value={title} onChange={setTitle} />
        <TextArea label={t('routes.editItem.descriptionField')} value={description} onChange={setDescription} />
      </DialogContent>
      <DialogContent>
        {error && <Typography color="error">{error.message}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={() => history.push('/')}>{t('buttons.cancel')}</Button>
        <SubmitButton disabled={loading} onClick={onSubmit}>{t('buttons.continue')}</SubmitButton>
      </DialogActions>
    </Dialog>
  )
}