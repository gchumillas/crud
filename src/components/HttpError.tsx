import React from 'react'
import { useTranslation } from 'react-i18next'
import { DialogContent, DialogContentText } from '@material-ui/core'
import { HTTP_UNKNOWN } from '../lib/http'

type Props = {
  path: string,
  status: number
}

export default ({ path, status }: Props) => {
  const { t } = useTranslation()
  const message = t(`${path}.http.${status}`, t(`http.${status}`, t(`http.${HTTP_UNKNOWN}`)))

  return (
    <DialogContent>
      <DialogContentText color="error">{message}</DialogContentText>
    </DialogContent>
  )
}