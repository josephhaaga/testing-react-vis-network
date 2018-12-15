import React, { Component } from 'react';
import { Node, Edge } from '@lifeomic/react-vis-network';

class GraphObject{
  constructor(id, type, filters = []){
    this.id = id;
    this.type = type;
    this.filters = filters;
  }
  getId(){
    return this.id;
  }
  setId(newId){
    this.id = newId;
  }
  getType(){
    return this.type;
  }
  setType(newType){
    this.type = newType;
  }
  addFilter(newFilter){
    this.filters.push(newFilter)
  }
  updateFilter(oldFilter, newFilter){
    this.filters = this.filters.map(x =>
      ((x === oldFilter)
        ? newFilter
        : x
      )
    )
  }
  deleteFilter(filterToDelete){
    this.filters = this.filters.filter(x => x !== filterToDelete)
  }
}

class GraphNode extends GraphObject{
  constructor(id, type){
    super(id, type)
  }
  render(){
    const Filters = props => {
      return (
        <ul className="filter-list">
          {this.filters.map((f, idx) =>
            <li key={idx}>{f.attribute + " " + f.operation + " " + f.value}</li>
          )}
        </ul>
      );
    };
    return (
      <Node key={"n"+this.id}
        id={this.id}
        label={this.id+": "+this.type}
        type={this.type}
        decorator={Filters} />
    )
  }
}

class GraphEdge extends GraphObject{
  constructor(id, type, from, to){
    super(id, type)
    this.from = from;
    this.to = to;
  }
  getFrom(){
    return this.from;
  }
  setFrom(newFrom){
    this.from = newFrom;
  }
  getTo(){
    return this.to;
  }
  setTo(newTo){
    this.to = newTo;
  }
  getTriplet(){
    return "(" + this.from.getId() + ":" +
      this.from.getType()+")-[" + this.id +
      ":" + this.type + "]->(" + this.to.getId() +
      ":" + this.to.getType() + ")";
  }
  render(){
    const Filters = props => {
      return (
        <ul className="filter-list">
          {this.filters.map((f, idx) =>
            <li key={idx}>{f.attribute + " " + f.operation + " " + f.value}</li>
          )}
        </ul>
      );
    };
    return (
      <Edge
        key={this.id}
        id={this.id}
        from={this.from.getId()}
        to={this.to.getId()}
        label={this.type}
        type={this.type} />
    )
  }
}

class Graph {
  constructor(nodes = [], edges = []){
    this.nodes = nodes;
    this.edges = edges;
  }
  getNodes(){return this.nodes}
  setNodes(n){this.nodes = n}
  getEdges(){return this.edges}
  setEdges(e){this.nodes = e}
  addEdge(e){this.edges.push(e)}
  deleteEdge(e){
    this.edges = this.edges.filter(a => a !== e)
  }
  addNode(n){this.nodes.push(n)}
  deleteNode(n){
    this.nodes = this.nodes.filter(a => a !== n)
  }
  render(){
    let total = this.nodes;
    total = total.concat(this.edges)
    return (
      total.map(x =>
        x.render()
      )
    )
  }
}

let seed = function(){
  let a = new GraphNode('v1', "Person")
  let c = new GraphNode('v2', "Person")
  let b = new GraphEdge('e1', 'claims_dependent', a, c)
  return new Graph([a,c], [b])
}

let g = seed()

export { GraphNode, GraphEdge, Graph, g }
