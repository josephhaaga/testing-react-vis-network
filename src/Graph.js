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
    const newId = "v" + (Math.max(...n.map(x => parseInt(x.id.slice(1)))) + 1)
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

  deleteNode(idToDel){
    const n = this.state.nodes.filter(x => x.id !== idToDel)
    this.setState({nodes: n})
  }

  render(){
    const DeleteButton = props => {
      return (
        <button onClick={(e) => this.deleteNode(props.id)}>X</button>
      );
    };
    const nodes = this.state.nodes.map(x =>
      <Node key={"n"+x.id} id={x.id} label={x.id+": "+x.type} type={x.type} decorator={DeleteButton} />
    )
    const edges = this.state.edges.map(x =>
      <Edge key={"e"+x.id} id={x.id} from={x.from} to={x.to} label={x.type} type={x.type}/>
    )
    const listOfNodes = this.state.nodes.map(x =>
      <tr><td>{x.id}</td><td style={{color: 'red'}}>isa</td><td>{x.type}</td></tr>
    )
    const listOfEdges = this.state.edges.map(x =>
      <tr><td>{x.from}</td><td>{x.type}</td><td>{x.to}</td></tr>
    )
    return (
      <div className="grid-x">
        <div className="cell medium-4">
          <button className="button" onClick={this.addNode}>Add Node</button>
          <button className="button" onClick={this.addEdge}>Add Edge</button>
          <div>
            <div>
              <h2>Nodes</h2>
              <table>
                <tbody>
                  {listOfNodes}
                </tbody>
              </table>
            </div>
            <div>
              <h2>Edges</h2>
              <table>
                <tbody>
                  {listOfEdges}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="cell medium-8" style={{background: 'lightgray'}}>
          <Network options={{'height':'600px'}}>
            {nodes}
            {edges}
          </Network>
        </div>
      </div>
    )
  }
}

export { Graph }
