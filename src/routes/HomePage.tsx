import React from 'react'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { useAsyncRetry } from 'react-use'
import { Switch, Route, match, useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Item, readItems } from '../providers/item'
import {
  KeyboardArrowDown as DescIcon,
  KeyboardArrowUp as AscIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import {
  Paper, IconButton, Snackbar, LinearProgress, Link,
  Table, TableHead, TableRow, TableCell, TableBody, TablePagination,
} from '@material-ui/core'
import { appContext, pageContext } from '../lib/context'
import { HTTP_UNAUTHORIZED } from '../lib/http'
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
  },
  table: {
    '& th:first-child': {
      width: 1
    },
    '& td': {
      whiteSpace: 'nowrap'
    }
  },
  link: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    alignItems: 'center'
  },
  longText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    whiteSpace: 'pre-line',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
  }
}))

export default ({ match }: Props) => {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation()
  const { token, logout } = React.useContext(appContext)
  const [page, setPage] = React.useState(0)
  const [sort, setSort] = React.useState<{ column: string, direction: string }>({ column: 'id', direction: 'desc' })
  const [rowsPerPage, setRowsPerPage] = React.useState(0)
  const [numRows, setNumRows] = React.useState(0)
  const [rows, setRows] = React.useState<Item[]>([])

  const state = useAsyncRetry(async () => {
    const doc = await readItems(token, { page, sort })

    setSort({ column: doc.sortColumn, direction: doc.sortDirection })
    setRowsPerPage(doc.rowsPerPage)
    setNumRows(doc.numRows)
    setRows(doc.items)
  }, [page, sort.column, sort.direction])

  const onColumnClick = (column: string, defaultSortDirection: string) => (e: React.SyntheticEvent) => {
    const direction = sort.column === column ? (sort.direction === 'desc' ? '' : 'desc') : defaultSortDirection

    setSort({ column, direction })
    setPage(0)
    e.preventDefault()
  }

  const status = _.get(state.error, 'response.status')
  const message = status ? `http.${status}` : _.get(state.error, 'message', '')

  if (status === HTTP_UNAUTHORIZED) {
    logout()
  }

  return (
    <pageContext.Provider value={{ refresh: state.retry }}>
      <Paper>
        <LinearProgress color="secondary" className={clsx({ [classes.hidden]: !state.loading })} />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="right">
                <Link href="#" className={classes.link} onClick={onColumnClick('id', 'desc')}>
                  <span>{t('routes.home.idColumn')}</span>
                  {sort.column === 'id' && (sort.direction === 'desc' ? <DescIcon /> : <AscIcon />)}
                </Link>
              </TableCell>
              <TableCell>
                <Link href="#" className={classes.link} onClick={onColumnClick('title', 'asc')}>
                  <span>{t('routes.home.titleColumn')}</span>
                  {sort.column === 'title' && (sort.direction === 'desc' ? <DescIcon /> : <AscIcon />)}
                </Link>
              </TableCell>
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
                <TableCell align="right">
                  #{row.id}
                </TableCell>
                <TableCell>
                  {row.title}
                </TableCell>
                <TableCell>
                  <span className={classes.longText}>{row.description}</span>
                </TableCell>
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
      <Snackbar open={!!message} message={t(message)} />
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