import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { Home as HomeIcon } from '@material-ui/icons'
import {
  AppBar, Toolbar, IconButton, Typography, Link, Button,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { appContext } from '../lib/context'
import SubmitButton from './buttons/SubmitButton'

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}))

const Header = () => {
  const classes = useStyles()
  const { logout } = React.useContext(appContext)
  const { t } = useTranslation()
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false)

  const onLogout = () => {
    setConfirmDialogOpen(false)
    logout()
  }

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <IconButton href="/" color="inherit">
          <HomeIcon />
        </IconButton>
        <Typography variant="h5" className={classes.title}>
          <Link href="/" color="inherit" underline="none">
            {t('appTitle')}
          </Link>
        </Typography>
        <IconButton color="inherit" onClick={() => setConfirmDialogOpen(true)}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
      {/* CONFIRM DIALOG */}
      <Dialog open={confirmDialogOpen}>
        <DialogTitle>{t('header.confirmDialogTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('header.confirmDialogText')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>{t('buttons.cancel')}</Button>
          <SubmitButton onClick={onLogout}>{t('buttons.continue')}</SubmitButton>
        </DialogActions>
      </Dialog>
    </AppBar>
  )
}

export default Header
