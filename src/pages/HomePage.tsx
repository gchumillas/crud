import React from 'react'
import { useAsync } from 'react-use'
import context from '../context'
import { getItems } from '../providers/item'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core'

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
            <TableCell>Description</TableCell>
            <TableCell align="right">
              <IconButton title="Add new item">
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.value && state.value.items.map(item => (
            <TableRow key={item.title}>
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell align="right" title="Edit item">
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" title="Delete item">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}