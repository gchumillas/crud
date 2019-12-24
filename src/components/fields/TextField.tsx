import React from 'react'
import { TextField, TextFieldProps } from '@material-ui/core'

type Props = Omit<TextFieldProps, 'onChange'> & {
  onChange: (value: string) => void
}

export default ({ fullWidth = true, onChange, ...rest }: Props) => (
  // @ts-ignore
  <TextField fullWidth={fullWidth} onChange={v => onChange(v.target.value)} {...rest} />
)