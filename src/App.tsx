import React, { Component } from 'react'
import './config.js'
import { CssBaseline } from '@material-ui/core'
import AppBar from './app/components/AppBar';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Collections from './app/pages/collections/Collections'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <CssBaseline />
          <AppBar />

          {/* <Summary /> */}
          <Route path="/collections" component={Collections} />
        </div>
      </Router>

    )
  }
}
