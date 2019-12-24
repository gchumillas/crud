import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { appContext } from '../context'

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(2),
    flexGrow: 1
  }
}))

const Header = () => {
  const classes = useStyles()
  const { logout } = React.useContext(appContext)
  const { t } = useTranslation()

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        {/* TODO: make the title clickable */}
        <Typography variant="h5" className={classes.title}>
          {t('appTitle')}
        </Typography>
        {/* TODO: confirm logout */}
        <IconButton color="inherit" onClick={logout}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
