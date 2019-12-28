import React from 'react'
import { TextField, StandardTextFieldProps } from '@material-ui/core'

type Props = Omit<StandardTextFieldProps, 'onChange'> & {
  onChange?: (value: string) => void
}

export default ({ fullWidth = true, onChange, ...rest }: Props) => (
  <TextField fullWidth={fullWidth} onChange={v => onChange && onChange(v.target.value)} {...rest} />
)