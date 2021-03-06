import React from 'react'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { useAsyncFn } from 'react-use'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { HTTP_UNAUTHORIZED } from '../lib/http'
import { appContext, pageContext } from '../lib/context'
import { deleteItem } from '../providers/item'
import SubmitButton from '../components/buttons/SubmitButton'

export default () => {
  const history = useHistory()
  const params = useParams<{ id: string }>()
  const { t } = useTranslation()
  const { token, logout } = React.useContext(appContext)
  const { refresh } = React.useContext(pageContext)

  const [state, onSubmit] = useAsyncFn(async () => {
    await deleteItem(token, params.id)
    refresh()
    history.push('/')
  }, [params.id])

  const status = _.get(state.error, 'response.status')
  const message = status ? `http.${status}` : _.get(state.error, 'message')

  if (status === HTTP_UNAUTHORIZED) {
    logout()
  }

  return (
    <Dialog open fullWidth maxWidth="xs">
      <DialogTitle>{t('routes.deleteItem.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('routes.deleteItem.confirmText')}
        </DialogContentText>
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