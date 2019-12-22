import React from 'react'
import { useAsync } from 'react-use'
import context from '../context'
import { getItems } from '../providers/item'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'

export default () => {
  const { token } = React.useContext(context)
  const state = useAsync(() => getItems(token))

  // TODO: state.loading, state.error && state.value
  // TODO: i18n
  return (
    <Paper>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.value && state.value.items.map(item => (
            <TableRow key={item.title}>
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="right">{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}