import React from 'react'
import { useAsyncFn } from 'react-use'
import { useTranslation } from 'react-i18next'
import { History } from 'history'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import context from '../context'
import { createItem } from '../providers/item'

type Props = {
  history: History
}

export default ({ history }: Props) => {
  const { t } = useTranslation()
  const { token } = React.useContext(context)
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [state, submit] = useAsyncFn(async () => {
    await createItem(token, title, description)
    history.push('/')
  })

  const onSubmit = () => {
    submit()
  }

  return (
    <Dialog open fullWidth maxWidth="sm">
      <DialogTitle>{t('routes.createItem.title')}</DialogTitle>
      <DialogContent>
        <TextField fullWidth autoFocus label={t('routes.createItem.title')} value={title} onChange={event => setTitle(event.target.value)} />
        <TextField fullWidth label={t('routes.createItem.description')} value={description} onChange={event => setDescription(event.target.value)} />
      </DialogContent>
      <DialogContent>
        {state.error && <Typography color="error">{state.error.message}</Typography>}
      </DialogContent>
      <DialogActions>
        {/* TODO: should be disabled while the request is loading */}
        {/* TODO: create a custom 'submit' button */}
        <Button disabled={state.loading}>{t('buttons.cancel')}</Button>
        <Button disabled={state.loading} type="submit" onClick={onSubmit}>{t('buttons.continue')}</Button>
      </DialogActions>
    </Dialog>
  )
}