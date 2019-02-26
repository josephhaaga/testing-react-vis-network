import React, { Component } from 'react';
import './App.css';
import { MotifBuilder } from './MotifBuilder.js';
import { OperationChooser } from './OperationChooser.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleOperationSelect = this.handleOperationSelect.bind(this)
  }
  handleOperationSelect(operation){
    console.log("User chose: " + operation.name)
    this.setState({
      operation: operation
    });
  }
  handleMotifSubmit(theQuery) {
    console.log("Motif pattern submitted:");
    console.log(JSON.parse(theQuery));
  }
  render() {
    const screen = ((this.state.operation)
      ? <MotifBuilder submit={this.handleMotifSubmit} /> 
      : <OperationChooser select={this.handleOperationSelect} />
    )
    return (
      <div className="App">
        <div>
          {screen}
        </div>
      </div>
    );
  }
}

export default App;
