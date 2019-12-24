import _ from 'lodash'
import React from 'react'
import { useAsyncRetry } from 'react-use'
import { Switch, Route, match } from 'react-router-dom'
import { History } from 'history'
import { readItems } from '../providers/item'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core'
import { appContext, pageContext } from '../lib/context'
import NotFoundPage from './NotFoundDialog'
import CreateItemDialog from './CreateItemDialog'
import EditItemDialog from './EditItemDialog'
import DeleteItemDialog from './DeleteItemDialog'

type Props = {
  history: History,
  match: match
}

export default ({ history, match }: Props) => {
  const { token } = React.useContext(appContext)
  const state = useAsyncRetry(() => readItems(token))
  const rows = _.get(state.value, 'items') || []
  const path = _.trimEnd(match.path, '/')

  // TODO: what happens on expiration session (401 erro)?
  // TODO: state.loading, state.error && state.value
  // TODO: i18n
  return (
    <pageContext.Provider value={{ refresh: state.retry }}>
      <Paper>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* TODO: columns should be marked as bold */}
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">
                {/* TODO: replace literal by constant */}
                <IconButton title="Add new item" onClick={() => history.push(`${path}/create-item`)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align="right">
                  <IconButton title="Edit item" onClick={() => history.push(`${path}/edit-item/${row.id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" title="Delete item" onClick={() => history.push(`${path}/delete-item/${row.id}`)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Switch>
        <Route exact path={`${path}/`} />
        <Route path={`${path}/create-item`} component={CreateItemDialog} />
        <Route path={`${path}/edit-item/:id`} component={EditItemDialog} />
        <Route path={`${path}/delete-item/:id`} component={DeleteItemDialog} />
        <Route component={NotFoundPage} />
      </Switch>
    </pageContext.Provider>
  )
}