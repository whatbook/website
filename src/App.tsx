import { CssBaseline } from '@material-ui/core';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainView from './app/components/MainView';
import WorkingSchedule from './app/pages/WorkingSchedule/WorkingSchedule';
import './config.js';
export default class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <CssBaseline />

          <Switch>
            <Route exact path="/working-schedule" component={WorkingSchedule} />
            <Route path="/" component={MainView} />
          </Switch>
        </div>
      </Router>
    )
  }
}
