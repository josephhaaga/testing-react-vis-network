import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="grid-x">
          <div className="cell small-6">
            <h2>Nodes</h2>
          </div>
          <div className="cell small-6">
            <button className="button"
              onClick={this.props.addNode}>+</button>
          </div>
          <div className="cell small-12">
            <div className="grid-x">
              {this.props.listOfNodes}
            </div>
          </div>
        </div>
        <div className="grid-x">
          <div className="cell small-6">
            <h2>Edges</h2>
          </div>
          <div className="cell small-6">
            <button className="button"
             onClick={this.props.addEdge}>+</button>
          </div>
          <div className="cell small-12">
            <div className="grid-x">
              {this.props.listOfEdges}
            </div>
          </div>
          <button
            onClick={this.props.genScal}
            className="button success">Generate Scala</button>
        </div>
      </div>
    )
  }
}

export { Sidebar }
