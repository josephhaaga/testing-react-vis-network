import React, { Component } from 'react';
import { Network } from '@lifeomic/react-vis-network';
import { Sidebar } from './Sidebar';
import { g } from './GraphObjects';


class MotifBuilder extends Component {
  constructor(props){
    super(props)
    this.state = {
      g: g,
      // TODO: refactor to constrain options, adhering to Graph Triplets from API
      nodeTypes: ["Vertex", "Person", "Company"],
      edgeTypes: ["Edge", "employed_by", "claims_dependent"],
      dataTypesAndOperations: {
        "string": ["contains", "equals"],
        "int": ["<", ">", "==", "<=", ">=", "!="]
      }
    }
  }

  render(){
    const update = () => {
      this.setState({g: this.state.g})
    }
    const graph = this.state.g.render()
    return (
      <div className="grid-y small-grid-frame">
        <div className="cell small-auto small-cell-block-container">
          <div className="grid-x grid-padding-x">
            <div className="cell small-6 small-cell-block-y">
              <Sidebar
                graph={this.state.g}
                parent={this}
                nodeTypes={this.state.nodeTypes}
                edgeTypes={this.state.edgeTypes}
                update={update} />
            </div>
            <div className="cell small-6 small-cell-block-y" style={{background: 'lightgray'}}>
              <Network options={{'height':'380px'}}>
                {graph}
              </Network>
            </div>
          </div>
        </div>
        <div className="cell shrink footer" style={{background: "black"}}>
        </div>
      </div>
    )
  }
}

export { MotifBuilder }
