import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAsyncFn } from 'react-use'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core'
import { appContext, pageContext } from '../lib/context'
import { deleteItem } from '../providers/item'
import SubmitButton from '../components/buttons/SubmitButton'

export default () => {
  const history = useHistory()
  const params = useParams<{ id: string }>()
  const { t } = useTranslation()
  const { token } = React.useContext(appContext)
  const { refresh } = React.useContext(pageContext)

  const [state, onSubmit] = useAsyncFn(async () => {
    await deleteItem(token, params.id)
    refresh()
    history.push('/')
  }, [params.id])

  return (
    <Dialog open>
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
        <SubmitButton disabled={state.loading} onClick={onSubmit}>{t('buttons.continue')}</SubmitButton>
      </DialogActions>
    </Dialog>
  )
}