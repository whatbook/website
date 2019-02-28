import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import NavButton from './NavButton';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles((theme) => {
  console.log(theme);
  return ({
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    uppercase: {
      textTransform: 'uppercase'
    },
    spaceBetween: {
      justifyContent: 'space-between'
    },
    activeBtn: {
      fontSize: '16px'
    }
  })
})

function ButtonAppBar() {
  const classes = styles()
  return (
    <div className={classes.root}>
      <AppBar color='default' position="static">
        <Toolbar className={classes.spaceBetween}>
          {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" color="inherit" className={classes.uppercase}>
            Whatbook
          </Typography>
          <NavButton activeOnlyWhenExact={true} to='/collections' label='yy' />
          <NavButton to='/xx' label='xx' />

          <div className={classes.grow}></div>
          {/* <Button color="primary">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default ButtonAppBar
