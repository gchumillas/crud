import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAsyncRetry } from 'react-use'
import { Switch, Route, match, useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Item, readItems } from '../providers/item'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Snackbar, LinearProgress, TablePagination } from '@material-ui/core'
import { appContext, pageContext } from '../lib/context'
import { HTTP_UNAUTHORIZED, getErrorStatus } from '../lib/http'
import NotFoundPage from './NotFoundDialog'
import CreateItemDialog from './CreateItemDialog'
import EditItemDialog from './EditItemDialog'
import DeleteItemDialog from './DeleteItemDialog'

type Props = {
  match: match
}

const useStyles = makeStyles(() => ({
  hidden: {
    visibility: 'hidden'
  }
}))

export default ({ match }: Props) => {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation()
  const { token, logout } = React.useContext(appContext)
  const [page, setPage] = React.useState(0)
  const [rows, setRows] = React.useState<Item[]>([])
  const [numRows, setNumRows] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(0)
  const state = useAsyncRetry(async () => {
    const doc = await readItems(token, page)

    setRowsPerPage(doc.rowsPerPage)
    setNumRows(doc.numRows)
    setRows(doc.items)
  }, [page, setRows])
  const status = state.error && getErrorStatus(state.error)

  if (status === HTTP_UNAUTHORIZED) {
    logout()
  }

  // TODO: sort by columns (title)
  return (
    <pageContext.Provider value={{ refresh: state.retry }}>
      <Paper>
        <LinearProgress className={clsx({ [classes.hidden]: !state.loading })} />
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
        <TablePagination
          component="div"
          rowsPerPageOptions={[rowsPerPage]}
          count={numRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(_, page) => setPage(page)}
        />
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