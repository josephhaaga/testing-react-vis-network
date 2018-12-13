import React, { Component } from 'react';
import { Network, Node, Edge } from '@lifeomic/react-vis-network';
import {PrismCode} from "react-prism";
// require('prismjs/themes/prism.css');

class Graph extends Component {
  constructor(props){
    super(props)
    this.addNode = this.addNode.bind(this)
    this.addEdge = this.addEdge.bind(this)
    this.genScal = this.genScal.bind(this)
    this.state = {
      nodes: [
        {id: 'v1', type: 'Person'},
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
      <Node key={"n"+x.id} id={x.id} label={x.id+": "+x.type} type={x.type} />
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

    const srcs = this.state.edges.map(x => x.from)
    const dsts = this.state.edges.map(x => x.to)
    let allNodes = this.state.nodes.map(x => x.id)
    const usedNodes = new Set([...new Set(srcs), ...new Set(dsts)])
    let difference = [...new Set(
      [...new Set(allNodes)].filter(x => !usedNodes.has(x)))];

    const theQuery = ((this.state.generateScala)
      ? <div>
          <PrismCode className="language-scala">
            {'val a = g.motif("'+this.state.edges.map(x =>
                "("+x.from+")-["+x.id+"]->("+x.to+");"
              ).join(" ")
              +difference.map(x => "("+x+');')+'")'}
            <br/>
            {this.state.nodes.filter(x =>
              x.type !== "Vertex"
            ).map(x =>
              ".filter("+x.id+".type == '"+x.type+"')"
            )}
            <br />
            {this.state.edges.filter(x =>
              x.type !== "Edge"
            ).map(x =>
              ".filter("+x.id+".relationship == '"+x.type+"')"
            )};
          </PrismCode>
        </div>
      : null
    )

    return (

      <div class="grid-y medium-grid-frame">
        <div class="cell medium-auto medium-cell-block-container">
          <div class="grid-x grid-padding-x">
            <div class="cell medium-4 medium-cell-block-y">
              <div className="grid-x">
                <div className="cell medium-6">
                  <h2>Nodes</h2>
                </div>
                <div className="cell medium-6">
                  <button className="button"
                    onClick={this.addNode}>Add Node</button>
                </div>
                <div className="cell medium-12">
                  <table>
                    <tbody>
                      {listOfNodes}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="grid-x">
                <div className="cell medium-6">
                  <h2>Edges</h2>
                </div>
                <div className="cell medium-6">
                  <button className="button"
                   onClick={this.addEdge}>Add Edge</button>
                </div>
                <div className="cell medium-12">
                  <table>
                    <tbody>
                      {listOfEdges}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={this.genScal}
                  className="button success">Generate Scala</button>
              </div>
            </div>
            <div class="cell medium-8 medium-cell-block-y" style={{background: 'lightgray'}}>
              <Network options={{'height':'600px'}}>
                {nodes}
                {edges}
              </Network>
            </div>
          </div>
        </div>
        <div class="cell shrink footer" style={{background: "black"}}>
          <div className="output-query">
            {theQuery}
          </div>
        </div>
      </div>
    )
  }
}

export { Graph }
