import React from 'react'
import { Select, SelectProps, FormControl, InputLabel, MenuItem } from '@material-ui/core'

type Props = Omit<SelectProps, 'onChange'> & {
  label?: string,
  options: { label: string, value: string }[],
  onChange?: (value: string) => void
}

export default ({ label, value, options, onChange }: Props) => (
  <FormControl fullWidth>
    {label && <InputLabel>{label}</InputLabel>}
    <Select value={value} onChange={e => onChange && onChange(`${e.target.value}`)}>
      {options.map(({ value, label }, key) => (
        <MenuItem key={key} value={value}>{label}</MenuItem>
      ))}
    </Select>
  </FormControl>
)