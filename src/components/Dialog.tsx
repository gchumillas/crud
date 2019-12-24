import React from 'react'
import { Dialog, DialogProps } from '@material-ui/core'

type Props = Omit<DialogProps, 'open'> & {
  open?: boolean
}

export default ({ open = true, fullWidth = true, maxWidth = 'sm', children, ...rest }: Props) => (
  <Dialog open={open} fullWidth={fullWidth} maxWidth={maxWidth} {...rest}>
    {children}
  </Dialog>
)