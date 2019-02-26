import React, { Component } from 'react';
import './App.css';
import { MotifBuilder } from './MotifBuilder.js';
import { OperationChooser } from './OperationChooser.js';

class App extends Component {
  constructor(props) {
    super(props)
    
    this.handleOperationSelect = this.handleOperationSelect.bind(this)
    this.state = {
      activeScreen: <OperationChooser select={this.handleOperationSelect} />
    }
  }
  handleOperationSelect(operation){
    console.log("User chose: " + operation.name)
    this.setState({
      activeScreen: <MotifBuilder submit={this.handleMotifSubmit} operation={operation} />
    });
  }
  handleMotifSubmit(theQuery) {
    // Show loading screen
    // On API response, show results page
    console.log("Motif pattern submitted:");
    console.log(JSON.parse(theQuery));
  }
  render() {
    return (
      <div className="App">
        <div>
          {this.state.activeScreen}
        </div>
      </div>
    );
  }
}

export default App;
