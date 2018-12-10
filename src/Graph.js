import React, { Component } from 'react';
import { Network, Node, Edge } from '@lifeomic/react-vis-network';

class Graph extends Component {
  constructor(props){
    super(props)
    this.addNode = this.addNode.bind(this)
    this.state = {
      nodes: [
        {id: 'v1', type: 'Person'},
        {id: 'v2', type: 'Vertex'},
        {id: 'v3', type: 'Person'},
      ],
      edges: [
        {id: 'e1', from: 'v1', to: 'v2', type: 'employed_by'},
        {id: 'e2', from: 'v3', to: 'v2', type: 'Edge'},
      ],
      nodeTypes: ["Vertex", "Person", "Company"],
      edgeTypes: ["Edge", "employed_by", "claims_dependent"]
    }
  }

  addNode(){
    let n = this.state.nodes
    const newId = "v" + (n.length + 1)
    n.push({id: newId, type: 'Vertex'})
    this.setState({nodes: n})
  }

  addEdge(){
    let nodes = this.state.nodes
    let e = this.state.edges
    // const newId = "vertex"+n.length
    // n.push({id: newId, label:'New Node'})
    // this.setState({edges: n})
  }

  updateType(id, newValue){
    if(id[0] === "e"){
      let e = this.state.edges
      const indexToUpdate = e.findIndex((z)=>z.id === id)
      e[indexToUpdate]['type'] = newValue
      this.setState({edges: e})
    }else{
      let n = this.state.nodes
      const indexToUpdate = n.findIndex((z)=>z.id === id)
      n[indexToUpdate]['type'] = newValue
      this.setState({nodes: n})
    }
  }

  render(){
    const NodeDecorator = props => {
      return (
        <select value={props.type} onChange={(e) => this.updateType(props.id, e.target.value)}>
          {this.state.nodeTypes.map(x =>
            <option value={x} key={"node-"+x}>{x}</option>
          )}
        </select>
      );
    };
    const EdgeDecorator = props => {
      return (
        <select value={props.type} onChange={(e) => this.updateType(props.id, e.target.value)}>
          {this.state.edgeTypes.map(x =>
            <option value={x} key={"edge-"+x}>{x}</option>
          )}
        </select>
      );
    };

    const nodes = this.state.nodes.map(x =>
      <Node key={"n"+x.id} id={x.id} label={x.id+": "+x.type} type={x.type} decorator={NodeDecorator} />
    )
    const edges = this.state.edges.map(x =>
      <Edge key={"e"+x.id} id={x.id} from={x.from} to={x.to} label={x.type} decorator={EdgeDecorator} type={x.type}/>
    )
    return (
      <div>
        <button onClick={this.addNode}>Add Node</button>
        <button onClick={this.addEdge}>Add Edge</button>
        <Network options={{'height':'600px'}}>
          {nodes}
          {edges}
        </Network>
      </div>
    )
  }
}

export { Graph }
