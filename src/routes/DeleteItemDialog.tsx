import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAsyncFn } from 'react-use'
import { match, useHistory } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core'
import { appContext, pageContext } from '../lib/context'
import { deleteItem } from '../providers/item'

type Props = {
  match: match<{ id: string }>
}

export default ({ match }: Props) => {
  const history = useHistory()
  const { t } = useTranslation()
  const { token } = React.useContext(appContext)
  const { refresh } = React.useContext(pageContext)
  const { id } = match.params
  const [state, onSubmit] = useAsyncFn(async () => {
    await deleteItem(token, id)
    refresh()
    history.push('/')
  }, [id])

  return (
    <Dialog open fullWidth maxWidth="sm">
      <DialogTitle>{t('routes.deleteItem.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('routes.deleteItem.confirmText')}
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        {state.error && <Typography color="error">{state.error.message}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button disabled={state.loading} onClick={() => history.push('/')}>{t('buttons.cancel')}</Button>
        <Button disabled={state.loading} type="submit" onClick={onSubmit}>{t('buttons.continue')}</Button>
      </DialogActions>
    </Dialog>
  )
}