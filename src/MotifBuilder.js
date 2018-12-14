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
    this.addFilter = this.addFilter.bind(this)
    this.changeType = this.changeType.bind(this)
    this.deleteNode = this.deleteNode.bind(this)
    this.deleteEdge = this.deleteEdge.bind(this)
    this.addFilter = this.addFilter.bind(this)
    this.updateFilter = this.updateFilter.bind(this)
    this.deleteFilter = this.deleteFilter.bind(this)
    this.state = {
      nodes: [
        {id: 'v1', type: 'Person', filters: [
          {attribute: "name", dtype: "string", operation: "contains", value: "Haaga"},
          {attribute: "age", dtype: "int", operation: ">", value: 30},
        ]},
        {id: 'v2', type: 'Vertex', filters: []},
        {id: 'v3', type: 'Person', filters: []},
        {id: 'v4', type: 'Vertex', filters: []},
      ],
      edges: [
        {id: 'e1', from: 'v1', to: 'v2', type: 'employed_by', filters: []},
        {id: 'e2', from: 'v3', to: 'v2', type: 'Edge', filters: []},
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
    let newId = "v1"
    if(n.length > 0){
      newId = "v" + (Math.max(...n.map(x => parseInt(x.id.slice(1)))) + 1)
    }
    n.push({id: newId, type: 'Vertex'})
    this.setState({nodes: n})
  }

  addEdge(){
    let e = this.state.edges
    // TODO: assign new ID if length of edges = 0
    let newId = "e1"
    console.log(e.length);
    if(e.length > 0){
      newId = "e" + (Math.max(...e.map(x => parseInt(x.id.slice(1)))) + 1)
    }
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
    const e = this.state.edges.filter(x => x.id !== idToDel)
    console.log(e);
    this.setState({edges: e})
  }

  changeType(id, newType){
    // TODO: refactor general method with classes (Node and Edge)
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

  addFilter(id){
    if(id[0] === 'e'){
      let edges = this.state.edges
      edges.filter(x => x.id === id)[0]['filters'].push({attribute: "", dtype: "", operation: "", value: ""})
      this.setState({
        edges: edges
      })
    }else if(id[0] === 'v'){
      let vertices = this.state.nodes
      vertices.filter(x => x.id === id)[0]['filters'].push({attribute: "", dtype: "", operation: "", value: ""})
      this.setState({
        nodes: vertices
      })
    }
  }

  // TODO: Implement
  updateFilter(idOfElement, oldFilter, newFilter) {
    if(idOfElement[0] === 'e'){
      let edges = this.state.edges
      const idxToChange = edges.map(x => x.id === idOfElement).indexOf(true)
      const newFilters = edges[idxToChange]['filters'].map(x =>
        ((x === oldFilter)
          ? newFilter
          : x
        )
      )
      edges[idxToChange]['filters'] = newFilters
      this.setState({
        edges: edges
      })
    }else if(idOfElement[0] === 'v'){
      let nodes = this.state.nodes
      const idxToChange = nodes.map(x => x.id === idOfElement).indexOf(true)
      const newFilters = nodes[idxToChange]['filters'].map(x =>
        ((x === oldFilter)
          ? newFilter
          : x
        )
      )
      nodes[idxToChange]['filters'] = newFilters
      this.setState({
        nodes: nodes
      })
    }
  }

  deleteFilter(idOfElement, filter){
    if(idOfElement[0] === 'e'){
      let edges = this.state.edges
      const idxToChange = edges.map(x => x.id === idOfElement).indexOf(true)
      const newFilters = edges[idxToChange]['filters'].filter(x => x !== filter)
      edges[idxToChange]['filters'] = newFilters
      this.setState({
        edges: edges
      })
    }else if(idOfElement[0] === 'v'){
      let nodes = this.state.nodes
      const idxToChange = nodes.map(x => x.id === idOfElement).indexOf(true)
      const newFilters = nodes[idxToChange]['filters'].filter(x => x !== filter)
      nodes[idxToChange]['filters'] = newFilters
      this.setState({
        nodes: nodes
      })
    }
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
    return (
      <div className="grid-y small-grid-frame">
        <div className="cell small-auto small-cell-block-container">
          <div className="grid-x grid-padding-x">
            <div className="cell small-6 small-cell-block-y">
              <Sidebar
                nodes={this.state.nodes}
                edges={this.state.edges}
                nodeTypes={this.state.nodeTypes}
                edgeTypes={this.state.edgeTypes}
                addNode={this.addNode}
                addEdge={this.addEdge}
                genScal={this.genScal}
                avail={avail}
                changeType={this.changeType}
                deleteNode={this.deleteNode}
                deleteEdge={this.deleteEdge}
                updateFilter={this.updateFilter}
                addFilter={this.addFilter}
                deleteFilter={this.deleteFilter} />
            </div>
            <div className="cell small-6 small-cell-block-y" style={{background: 'lightgray'}}>
              <Network options={{'height':'380px'}}>
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
