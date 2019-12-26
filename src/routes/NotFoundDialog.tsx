import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import SubmitButton from '../components/buttons/SubmitButton'

export default () => {
  const history = useHistory()
  const { t } = useTranslation()

  return (
    <Dialog open>
      <DialogTitle>{t('routes.notFound.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('routes.notFound.text')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SubmitButton onClick={() => history.push('/')}>{t('buttons.continue')}</SubmitButton>
      </DialogActions>
    </Dialog>
  )
}