import React from 'react'
import { KeyboardArrowRight as KeyboardArrowRightIcon, HourglassEmpty as HourglassEmptyIcon } from '@material-ui/icons'
import { Button, ButtonProps } from '@material-ui/core'

export default ({ type = 'submit', disabled, children, ...rest }: ButtonProps) => (
  <Button type={type} disabled={disabled} {...rest}>
    {children}
    {disabled ? <HourglassEmptyIcon /> : <KeyboardArrowRightIcon />}
  </Button>
)