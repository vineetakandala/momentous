import './styles/global.scss';

import React, {Component} from 'react';
import {hot} from 'react-hot-loader/root';
import moment from "moment-timezone";

moment.tz.setDefault("America/New_York");

class App extends Component {
  render() {
    return (
      <div>Hello World!</div>
    );
  }
};

export default hot(App);
