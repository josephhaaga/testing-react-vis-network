import React, { Component } from 'react';
import './App.css';
import { Graph } from './Graph.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Graph />
        </div>
      </div>
    );
  }
}

export default App;
