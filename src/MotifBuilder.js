import React, { Component } from 'react';
import { Network } from '@lifeomic/react-vis-network';
import { QueryGenerator } from './QueryGenerator';
import { Sidebar } from './Sidebar';
import { GraphEdge, GraphNode, Graph, g } from './GraphObjects';


class MotifBuilder extends Component {
  constructor(props){
    super(props)
    this.state = {
      graph: g,
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
    const graph = this.state.graph.render();
    return (
      <div className="grid-y small-grid-frame">
        <div className="cell small-auto small-cell-block-container">
          <div className="grid-x grid-padding-x">
            <div className="cell small-6 small-cell-block-y">
              
            </div>
            <div className="cell small-6 small-cell-block-y" style={{background: 'lightgray'}}>
              <Network options={{'height':'380px'}}>
                {graph}
              </Network>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { MotifBuilder }
