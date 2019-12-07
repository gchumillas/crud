import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(2),
    flexGrow: 1
  }
}))


const Header = () => {
  const classes = useStyles()
  const onConfirmExit = () => console.log('confirm exit')

  return (
    <AppBar>
      <Toolbar disableGutters>
        {/* TODO: use translations */}
        <Typography variant="h5" className={classes.title}>
          CRUD application
        </Typography>
        <IconButton color="inherit" onClick={onConfirmExit}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
