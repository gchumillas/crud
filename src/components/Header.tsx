import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import context from '../context'

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(2),
    flexGrow: 1
  }
}))

const Header = () => {
  const classes = useStyles()
  const { logout } = React.useContext(context)
  const { t } = useTranslation()

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
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
