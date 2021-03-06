import React from 'react'
import { TextField, StandardTextFieldProps } from '@material-ui/core'

type Props = Omit<StandardTextFieldProps, 'onChange' | 'multiline'> & {
  onChange: (value: string) => void
}

export default ({ fullWidth = true, rows = 5, onChange, ...rest }: Props) => (
  <TextField fullWidth={fullWidth} multiline rows={rows} onChange={v => onChange(v.target.value)} {...rest} />
)