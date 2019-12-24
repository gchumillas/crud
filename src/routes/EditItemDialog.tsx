import React from 'react'
import { useAsyncFn, useAsync } from 'react-use'
import { useTranslation } from 'react-i18next'
import { match } from 'react-router-dom'
import { History } from 'history'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@material-ui/core'
import { appContext, pageContext } from '~/context'
import { readItem, updateItem } from '~/providers/item'

type Props = {
  history: History,
  match: match<{ id: string }>
}

export default ({ history, match }: Props) => {
  const { t } = useTranslation()
  const { token } = React.useContext(appContext)
  const { refresh } = React.useContext(pageContext)
  const { id } = match.params
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  const initState = useAsync(async () => {
    const data = await readItem(token, id)

    setTitle(data.title)
    setDescription(data.description)
  }, [id])

  const [submitState, onSubmit] = useAsyncFn(async () => {
    await updateItem(token, id, title, description)
    refresh()
    history.push('/')
  }, [id, title, description])

  const loading = initState.loading || submitState.loading
  const error = initState.error || submitState.error

  return (
    <Dialog open fullWidth maxWidth="sm">
      <DialogTitle>{t('routes.editItem.title')}</DialogTitle>
      <DialogContent>
        <TextField fullWidth autoFocus required label={t('routes.editItem.titleField')} value={title} onChange={event => setTitle(event.target.value)} />
        <TextField fullWidth label={t('routes.editItem.descriptionField')} multiline rows={5} value={description} onChange={event => setDescription(event.target.value)} />
      </DialogContent>
      <DialogContent>
        {error && <Typography color="error">{error.message}</Typography>}
      </DialogContent>
      <DialogActions>
        {/* TODO: should be disabled while the request is loading */}
        {/* TODO: create a custom 'submit' button */}
        <Button disabled={loading} onClick={() => history.push('/')}>{t('buttons.cancel')}</Button>
        <Button disabled={loading} type="submit" onClick={onSubmit}>{t('buttons.continue')}</Button>
      </DialogActions>
    </Dialog>
  )
}