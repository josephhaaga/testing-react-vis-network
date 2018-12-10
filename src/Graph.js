import React, { Component } from 'react';
import { Network, Node, Edge } from '@lifeomic/react-vis-network';

class Graph extends Component {
  constructor(props){
    super(props)
    this.addNode = this.addNode.bind(this)
    this.addEdge = this.addEdge.bind(this)
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
    let e = this.state.edges
    const newId = "e" + (Math.max(...e.map(x => parseInt(x.id.slice(1)))) + 1)
    const f = this.state.nodes[0].id
    const t = this.state.nodes[0].id
    e.push({id: newId, type: "Edge", from: f, to: t})
    this.setState({edges: e})
  }

  deleteNode(idToDel){
    const n = this.state.nodes.filter(x => x.id !== idToDel)
    this.setState({nodes: n})
  }

  deleteEdge(idToDel){
    const e = this.state.edges.filter(x => x.id !== idToDel)
    this.setState({edges: e})
  }

  changeType(id, newType){
    if(id[0] === 'e'){
      const z = this.state.edges
      let p = z.map(x => {
        if(x.id === id){
          x = Object.assign(x, newType)
        }
        return x
      })
      this.setState({edges: p})
    }else{
      const z = this.state.nodes
      let p = z.map(x => {
        if(x.id === id){
          x['type'] = newType.target.value
        }
        return x
      })
      this.setState({nodes: p})
    }
  }

  render(){
    const nodes = this.state.nodes.map(x =>
      <Node key={"n"+x.id} id={x.id} label={x.id+": "+x.type} type={x.type} />
    )
    const edges = this.state.edges.map(x =>
      <Edge key={"e"+x.id} id={x.id} from={x.from} to={x.to} label={x.type} type={x.type}/>
    )
    const listOfNodes = this.state.nodes.map((x, idx) =>
      <tr key={idx}>
        <td>{x.id}</td>
        <td style={{color: 'red'}}>isa</td>
        <td>
          <select
            value={x.type}
            onChange={(e)=>this.changeType(x.id, e)}>
            {this.state.nodeTypes.map((y, idx) =>
              <option key={idx} value={y}>{y}</option>
            )}
          </select>
        </td>
        <td><button onClick={(e) => this.deleteNode(x.id)}>X</button></td>
      </tr>
    )
    const listOfEdges = this.state.edges.map(x =>
      <tr key={x.id}>
        <td>
          <select
            onChange={e => this.changeType(x.id, {"from": e.target.value})}
            value={x.from}>
            {this.state.nodes.map(a =>
              <option value={a.id}>{a.id}</option>
            )}
          </select>
        </td>
        <td>
          <select
            onChange={e => this.changeType(x.id, {"type": e.target.value})}
            value={x.type}>
            {this.state.edgeTypes.map(a =>
              <option value={a}>{a}</option>
            )}
          </select>
        </td>
        <td>
          <select
            onChange={e => this.changeType(x.id, {"to": e.target.value})}
            value={x.to}>
            {this.state.nodes.map(a =>
              <option value={a.id}>{a.id}</option>
            )}
          </select>
        </td>
        <td>
          <button onClick={(e) => this.deleteEdge(x.id)}>X</button>
        </td>
      </tr>
    )
    return (
      <div className="grid-x">
        <div className="cell medium-4">
          <div>
            <div>
              <h2>Nodes</h2>
              <button className="button" onClick={this.addNode}>Add Node</button>
              <table>
                <tbody>
                  {listOfNodes}
                </tbody>
              </table>
            </div>
            <div>
              <h2>Edges</h2>
              <button className="button" onClick={this.addEdge}>Add Edge</button>
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
