import React from 'react'
import PropTypes from 'prop-types'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import NavButton from './NavButton';

const styles = createStyles({
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

export interface Props extends WithStyles<typeof styles> { }

function ButtonAppBar(props: Props) {
  const { classes } = props

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

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
} as any

export default withStyles(styles)(ButtonAppBar)
