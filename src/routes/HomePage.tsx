import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAsyncRetry } from 'react-use'
import { Switch, Route, match, useHistory } from 'react-router-dom'
import { readItems } from '../providers/item'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Snackbar, LinearProgress } from '@material-ui/core'
import { appContext, pageContext } from '../lib/context'
import { HTTP_UNAUTHORIZED, getErrorStatus } from '../lib/http'
import NotFoundPage from './NotFoundDialog'
import CreateItemDialog from './CreateItemDialog'
import EditItemDialog from './EditItemDialog'
import DeleteItemDialog from './DeleteItemDialog'

type Props = {
  match: match
}

export default ({ match }: Props) => {
  const history = useHistory()
  const { t } = useTranslation()
  const { token, logout } = React.useContext(appContext)
  const state = useAsyncRetry(() => readItems(token))
  const status = state.error && getErrorStatus(state.error)
  const rows = _.get(state.value, 'items') || []

  if (status === HTTP_UNAUTHORIZED) {
    logout()
  }

  return (
    <pageContext.Provider value={{ refresh: state.retry }}>
      <Paper>
        <LinearProgress hidden={!state.loading} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('routes.home.titleColumn')}</TableCell>
              <TableCell>{t('routes.home.descriptionColumn')}</TableCell>
              <TableCell align="right">
                <IconButton title={t('routes.home.addItem')} onClick={() => history.push('/create-item')}>
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
                  <IconButton title={t('routes.home.editItem')} onClick={() => history.push(`/edit-item/${row.id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton title={t('routes.home.deleteItem')} onClick={() => history.push(`/delete-item/${row.id}`)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Snackbar open={!!status} message={t(`http.${status}`)} />
      <Switch>
        <Route exact path={'/'} />
        <Route path={'/create-item'} component={CreateItemDialog} />
        <Route path={'/edit-item/:id'} component={EditItemDialog} />
        <Route path={'/delete-item/:id'} component={DeleteItemDialog} />
        <Route component={NotFoundPage} />
      </Switch>
    </pageContext.Provider>
  )
}