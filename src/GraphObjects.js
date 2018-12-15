import React from 'react'
import { Node, Edge } from '@lifeomic/react-vis-network';

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
  constructor(id, type, filters){
    super(id, type, filters)
  }
  render(){
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
  render(){
    return (
      <Edge
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
  }
  getNodes(){return this.nodes}
  getEdges(){return this.edges}
  addNode(){
    this.nodes.push(new GraphNode('v'+(this.nodes.length + 1), 'Vertex'))
  }
  deleteNode(a){
    this.nodes = this.nodes.filter(x => x !== a)
  }
  addEdge(){
    this.edges.push(new GraphEdge('v'+(this.edges.length + 1), 'Edge'))
  }
  deleteEdge(a){
    this.edges = this.edges.filter(x => x !== a)
  }
  render(){
    let a = this.nodes
    a = a.concat(this.edges)
    return(
      a.map(x => x.render())
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

export { GraphNode, GraphEdge, g }
