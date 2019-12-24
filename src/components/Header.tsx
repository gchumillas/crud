import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { Home as HomeIcon } from '@material-ui/icons'
import { AppBar, Toolbar, IconButton, Typography, Link } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { appContext } from '../context'

const useStyles = makeStyles(theme => ({
  title: {
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
        <IconButton href="/" color="inherit">
          <HomeIcon />
        </IconButton>
        <Typography variant="h5" className={classes.title}>
          <Link href="/" color="inherit" underline="none">
            {t('appTitle')}
          </Link>
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
