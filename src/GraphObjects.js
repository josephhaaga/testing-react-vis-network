import React, { Component } from 'react'
import { Network, Node, Edge } from '@lifeomic/react-vis-network';

class GraphObject{
  constructor(id, type, filters=[]){
    this.id = id;
    this.type = type;
    this.filters = filters;
  }
  getId(){return this.id}
  setId(newId){this.id = newId}
  getType(){return this.type}
  setType(newType){this.type = newType}
  getFilters(){return this.filters}
  addFilter(){
    this.filters.push({
      attribute: "",
      dtype: "",
      operation: "",
      value: ""
    })
  }
  updateFilter(oldF, newF){
    this.filters = this.filters.map(x => {
      if(x === oldF){
        return newF
      }
      return x
    })
  }
  deleteFilter(oldF){
    this.filters = this.filters.filter(x => x !== oldF)
  }
}
class GraphNode extends GraphObject {
  render(idx){
    const Filters = props => {
      return (
        <ul className="filter-list">
          {this.getFilters().map((f, idx) =>
            <li key={idx}>{f.attribute + " " + f.operation + " " + f.value}</li>
          )}
        </ul>
      );
    };
    return (
      <Node
        key={idx}
        id={this.id}
        label={this.id+":"+this.type}
        decorator={Filters} />
    )
  }
}
class GraphEdge extends GraphObject {
  constructor(id, type, filters, from, to){
    super(id, type, filters)
    this.from = from;
    this.to = to;
  }
  getFrom(){return this.from}
  setFrom(from){this.from = from; console.log(from);}
  getTo(){return this.to}
  setTo(to){this.to = to}
  render(idx){
    return (
      <Edge
        key={idx}
        id={this.id}
        label={this.id+":"+this.type}
        from={this.from}
        to={this.to} />
    )
  }
}
class Graph {
  constructor(nodes=[], edges=[]){
    this.nodes = nodes;
    this.edges = edges;
    this.nodesAdded = this.nodes.length;
    this.edgesAdded = this.edges.length;
  }
  getNodes(){
    return this.nodes
  }
  getEdges(){
    return this.edges
  }
  addNode(){
    this.nodesAdded++;
    const newId = this.nodesAdded;
    this.nodes.push(new GraphNode('v'+newId, 'Vertex'))
  }
  deleteNode(a){
    const edgesToDelete = this.edges.filter(x =>
      (x.getFrom() === a || x.getTo() === a)
    )
    edgesToDelete.map(x => this.deleteEdge(x.getId()))
    this.nodes = this.nodes.filter(x =>
      x.getId() !== a
    )
  }
  addEdge(){
    this.edgesAdded++;
    const newId = this.edgesAdded;
    this.edges.push(new GraphEdge('e'+newId, 'Edge', [], 'v1', 'v1'))
  }
  deleteEdge(a){
    this.edges = this.edges.filter(x =>
      x.getId() !== a
    )
  }
  render(){
    let a = this.nodes
    a = a.concat(this.edges)
    return(
      a.map((x,idx) => x.render(idx))
    )
  }
}

class NetworkGraph extends Component {
  render(){
    const nodes = this.props.nodes.map((x, idx) =>
      x.render(idx)
    )
    const edges = this.props.edges.map((x, idx) =>
      x.render(idx)
    )
    return(
      <Network options={{'height':'380px'}}>
        {nodes}
        {edges}
      </Network>
    )
  }
}


let g = new Graph([
  new GraphNode('v1', 'Vertex'),
  new GraphNode('v2', 'Vertex'),
],
[
  new GraphEdge('e1', 'Edge', [], 'v1', 'v2')
])

export { GraphNode, GraphEdge, g, NetworkGraph }
