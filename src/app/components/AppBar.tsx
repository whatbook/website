import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import NavButton from './NavButton';
import { makeStyles } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme } from '@material-ui/core'
// import { unstable_Box as Box } from '@material-ui/core/Box';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
})

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

function ButtonAppBar () {
  const classes = styles()
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar color='default' position="static">
            <Toolbar className={classes.spaceBetween}>
              {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
              <Typography variant="h6" color="inherit" className={classes.uppercase}>
                Whatbook
          </Typography>
              <NavButton activeOnlyWhenExact={true} to='/collections' label='藏品' />
              <NavButton to='/economics' label='经济' />
              <NavButton to='/working-schedule' label='排班表' />

              <div className={classes.grow}></div>
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    </NoSsr >
  )
}

export default ButtonAppBar
