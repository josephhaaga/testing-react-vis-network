import React, { Component } from 'react';
import { Network, Node, Edge } from '@lifeomic/react-vis-network';
import { QueryGenerator } from './QueryGenerator';
import { Sidebar } from './Sidebar';

class MotifBuilder extends Component {
  constructor(props){
    super(props)
    this.addNode = this.addNode.bind(this)
    this.addEdge = this.addEdge.bind(this)
    this.genScal = this.genScal.bind(this)
    this.state = {
      nodes: [
        {id: 'v1', type: 'Person', filters: [
          {attribute: "name", dtype: "string", operation: "contains", value: "Haaga"},
          {attribute: "age", dtype: "int", operation: ">", value: 30},
        ]},
        {id: 'v2', type: 'Vertex'},
        {id: 'v3', type: 'Person'},
        {id: 'v4', type: 'Vertex'},
      ],
      edges: [
        {id: 'e1', from: 'v1', to: 'v2', type: 'employed_by'},
        {id: 'e2', from: 'v3', to: 'v2', type: 'Edge'},
      ],
      // TODO: refactor to constrain options, adhering to Graph Triplets from API
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
    // TODO: assign new ID if length of edges = 0
    const newId = "e" + (Math.max(...e.map(x => parseInt(x.id.slice(1)))) + 1)
    const f = this.state.nodes[0].id
    const t = this.state.nodes[0].id
    e.push({id: newId, type: "Edge", from: f, to: t})
    this.setState({edges: e})
  }

  deleteNode(idToDel){
    const n = this.state.nodes.filter(x => x.id !== idToDel)
    const e = this.state.edges.filter(x => x.from !== idToDel && x.to !== idToDel)
    this.setState({nodes: n, edges: e})
  }

  deleteEdge(idToDel){
    console.log("running deleteEdge on "+idToDel);
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

  genScal(){
    this.setState({generateScala: true})
  }

  render(){
    const nodes = this.state.nodes.map(x =>
      (("filters" in x)
        ? <Node
            key={"n"+x.id}
            id={x.id}
            label={
              x.id
              +": "
              +x.type
              +"\nwith"
              +x.filters.map(f =>
                "\n" + f.attribute + " " + f.operation + " " + f.value
              )} type={x.type} />
        : <Node key={"n"+x.id} id={x.id} label={x.id+": "+x.type} type={x.type} />
      )
    )
    const edges = this.state.edges.map(x =>
      <Edge key={"e"+x.id} id={x.id} from={x.from} to={x.to} label={x.type} type={x.type}/>
    )


    const avail = ((this.state.generateScala) ? `disabled` : null);
    // TODO: refactor <select> elements into http://furqanzafar.github.io/react-selectize/#/
    const listOfNodes = this.state.nodes.map((x, idx) =>
      <tr key={idx}>
        <td>{x.id}</td>
        <td style={{color: 'red'}}>isa</td>
        <td>
          <select
            value={x.type}
            disabled={avail}
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
            disabled={avail}
            onChange={e => this.changeType(x.id, {"from": e.target.value})}
            value={x.from}>
            {this.state.nodes.map((a, idx) =>
              <option key={idx} value={a.id}>{a.id}</option>
            )}
          </select>
        </td>
        <td>
          <select
            disabled={avail}
            onChange={e => this.changeType(x.id, {"type": e.target.value})}
            value={x.type}>
            {this.state.edgeTypes.map((a, idx) =>
              <option key={idx} value={a}>{a}</option>
            )}
          </select>
        </td>
        <td>
          <select
            disabled={avail}
            onChange={e => this.changeType(x.id, {"to": e.target.value})}
            value={x.to}>
            {this.state.nodes.map((a, idx) =>
              <option key={idx} value={a.id}>{a.id}</option>
            )}
          </select>
        </td>
        <td>
          <button disabled={avail} onClick={(e) => this.deleteEdge(x.id)}>X</button>
        </td>
      </tr>
    )


    return (
      <div className="grid-y small-grid-frame">
        <div className="cell small-auto small-cell-block-container">
          <div className="grid-x grid-padding-x">
            <div className="cell small-6 medium-4 small-cell-block-y">
              <Sidebar
                listOfNodes={listOfNodes}
                listOfEdges={listOfEdges}
                addNode={this.addNode}
                addEdge={this.addEdge}
                genScal={this.genScal} />
            </div>
            <div className="cell small-6 medium-8 small-cell-block-y" style={{background: 'lightgray'}}>
              <Network options={{'height':'500px'}}>
                {nodes}
                {edges}
              </Network>
            </div>
          </div>
        </div>
        <div className="cell shrink footer" style={{background: "black"}}>
          <div className="output-query">
            <QueryGenerator edges={this.state.edges} nodes={this.state.nodes} />
          </div>
        </div>
      </div>
    )
  }
}

export { MotifBuilder }
