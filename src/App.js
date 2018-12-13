import React, { Component } from 'react';
import './App.css';
import { MotifBuilder } from './MotifBuilder.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <MotifBuilder />
        </div>
      </div>
    );
  }
}

export default App;
