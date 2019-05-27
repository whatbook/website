import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Collections from '../pages/collections/Collections';
import AppBar from './AppBar';

class MainView extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <Route path="/collections" component={Collections} />
      </div>
    )
  }
}

export default MainView