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
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core'
import { appContext, pageContext } from '../lib/context'
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
  const { token } = React.useContext(appContext)
  const state = useAsyncRetry(() => readItems(token))
  const rows = _.get(state.value, 'items') || []
  const path = _.trimEnd(match.path, '/')

  // TODO: what happens on expiration session (401 error)?
  // TODO: state.loading, state.error && state.value
  return (
    <pageContext.Provider value={{ refresh: state.retry }}>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('routes.home.titleColumn')}</TableCell>
              <TableCell>{t('routes.home.descriptionColumn')}</TableCell>
              <TableCell align="right">
                {/* TODO: replace literal by constant */}
                <IconButton title={t('routes.home.addItem')} onClick={() => history.push(`${path}/create-item`)}>
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
                  <IconButton title={t('routes.home.editItem')} onClick={() => history.push(`${path}/edit-item/${row.id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton title={t('routes.home.deleteItem')} onClick={() => history.push(`${path}/delete-item/${row.id}`)} color="secondary">
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