import React, { Component } from 'react'
import './config.js'
import { CssBaseline } from '@material-ui/core'
import AppBar from './app/components/AppBar';

export default class App extends Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <AppBar />
        {/* <Button>
          你好, 世界
        </Button>
        <Summary /> */}

      </div>
    )
  }
}
