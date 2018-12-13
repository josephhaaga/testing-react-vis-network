import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <div>
        <div className="grid-x">
          <div className="cell small-6">
            <h2>Nodes</h2>
          </div>
          <div className="cell small-6">
            <button className="button"
              onClick={this.props.addNode}>+</button>
          </div>
          <div className="cell small-12">
            <table>
              <tbody>
                {this.props.listOfNodes}
              </tbody>
            </table>
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
            <table>
              <tbody>
                {this.props.listOfEdges}
              </tbody>
            </table>
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
