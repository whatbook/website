import { CssBaseline } from '@material-ui/core';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainView from './app/components/MainView';
import Collections from './app/pages/collections/Collections';
import WorkingSchedule from './app/pages/X/workingSchedule';
import './config.js';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <CssBaseline />
          <MainView />

          <Route path="/collections" component={Collections} />
          <Route path="/working-schedule" component={WorkingSchedule} />
        </div>
      </Router>

    )
  }
}
