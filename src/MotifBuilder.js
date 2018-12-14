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
      edgeTypes: ["Edge", "employed_by", "claims_dependent"],
      dataTypesAndOperations: {
        "string": ["contains", "equals"],
        "int": ["<", ">", "==", "<=", ">=", "!="]
      }
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


  updateFilter(a,b,d) {
    console.log(a, b, d);
  }

  render(){

    const Filters = props => {
      const data = props.data
      return (
        (("filters" in data)
          ? <ul className="filter-list">
              {data.filters.map((f, idx) =>
                <li key={idx}>{f.attribute + " " + f.operation + " " + f.value}</li>
              )}
            </ul>
          : null
        )
      );
    };

    const nodes = this.state.nodes.map(x =>
      <Node key={"n"+x.id} id={x.id} label={x.id+": "+x.type} data={x} type={x.type} decorator={Filters} />
    )
    const edges = this.state.edges.map(x =>
      <Edge key={"e"+x.id} id={x.id} color="green" from={x.from} to={x.to} label={x.type} type={x.type} />
    )


    const avail = ((this.state.generateScala) ? `disabled` : null);
    // TODO: refactor <select> elements into http://furqanzafar.github.io/react-selectize/#/
    // TODO: move listOfNodes and listOfEdges into Sidebar
    const listOfNodes = this.state.nodes.map((x, idx) =>
      <div className="cell small-12 entity" key={idx}>
        <div className="grid-x">
          <div className="cell small-4">{x.id}</div>
          <div className="cell small-4" style={{color: "red"}}>isa</div>
          <div className="cell small-4">
            <select
              value={x.type}
              disabled={avail}
              onChange={(e)=>this.changeType(x.id, e)}>
              {this.state.nodeTypes.map((y, idx) =>
                <option key={idx} value={y}>{y}</option>
              )}
            </select>
            <button onClick={(e) => this.deleteNode(x.id)}>X</button>
          </div>
          <div className="cell small-12">
            {(("filters" in x)
              ? <ul style={{textAlign: "left", listStyleType: "none"}}>
                  {x.filters.map((f, idx2) =>
                    <li key={idx2}>
                      <div className="grid-x">
                        {Object.keys(f).filter(key => key !== "dtype").map((a, idx3) =>
                          <div key={idx3} className="cell small-4">
                            <select onChange={e => this.updateFilter(e, x.id, a)}>
                              <option>{f[a]}</option>
                              <option>Another option</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </li>
                  )}
                </ul>
              : <div><button className="button">Add Filters</button></div>
            )}
          </div>
        </div>
      </div>
    )
    const listOfEdges = this.state.edges.map(x =>
      <div className="cell small-12 entity" key={x.id}>
        <div className="grid-x">
          <div className="cell small-3">
            <select
              disabled={avail}
              onChange={e => this.changeType(x.id, {"from": e.target.value})}
              value={x.from}>
              {this.state.nodes.map((a, idx) =>
                <option key={idx} value={a.id}>{a.id}</option>
              )}
            </select>
          </div>
          <div className="cell small-4">
            <select
              disabled={avail}
              onChange={e => this.changeType(x.id, {"type": e.target.value})}
              value={x.type}>
              {this.state.edgeTypes.map((a, idx) =>
                <option key={idx} value={a}>{a}</option>
              )}
            </select>
          </div>
          <div className="cell small-3">
            <select
              disabled={avail}
              onChange={e => this.changeType(x.id, {"to": e.target.value})}
              value={x.to}>
              {this.state.nodes.map((a, idx) =>
                <option key={idx} value={a.id}>{a.id}</option>
              )}
            </select>
          </div>
          <div className="cell small-2">
            <button disabled={avail} onClick={(e) => this.deleteEdge(x.id)}>X</button>
          </div>
        </div>
      </div>
    )


    return (
      <div className="grid-y small-grid-frame">
        <div className="cell small-auto small-cell-block-container">
          <div className="grid-x grid-padding-x">
            <div className="cell small-6 small-cell-block-y">
              <Sidebar
                listOfNodes={listOfNodes}
                listOfEdges={listOfEdges}
                addNode={this.addNode}
                addEdge={this.addEdge}
                genScal={this.genScal} />
            </div>
            <div className="cell small-6 small-cell-block-y" style={{background: 'lightgray'}}>
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
