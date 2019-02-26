import React, { Component } from 'react';
import './App.css';
import { MotifBuilder } from './MotifBuilder.js'

class App extends Component {
  handleSubmit(theQuery){
    console.log("Motif pattern submitted:");
    console.log(JSON.parse(theQuery));
  }
  render() {
    return (
      <div className="App">
        <div>
          <MotifBuilder submit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default App;
